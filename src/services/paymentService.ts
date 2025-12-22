// ========== src/services/paymentService.ts ==========

interface PaymentData {
  amount: number;
  email: string;
  username: string;
  paymentMethod: string;
}

interface PaymentResult {
  success: boolean;
  transactionId: string;
  message: string;
}

// API эндпоинт для обработки платежей
const PAYMENT_API_ENDPOINT = 'http://155.212.189.102:3000/api/tinkoff/callback';

/**
 * Маппинг способов оплаты на тип платежа для API
 */
const paymentMethodMap: { [key: string]: string } = {
  'card': 'card_rf',
  'sbp': 'sbp_rf',
  // 'qiwi': 'qiwi_rf',
  // 'yoomoney': 'yoomoney_rf',
  // 'crypto': 'crypto'
};

/**
 * Обработка платежа
 * Отправляет запрос на API эндпоинт с параметрами платежа
 */
export const processPayment = async (paymentData: PaymentData): Promise<PaymentResult> => {
  try {
    // Валидация данных
    if (!paymentData.amount || paymentData.amount < 10 || paymentData.amount > 50000) {
      throw new Error('Некорректная сумма платежа');
    }

    if (!paymentData.email || !paymentData.username || !paymentData.paymentMethod) {
      throw new Error('Не все поля заполнены');
    }

    // Преобразование способа оплаты в тип платежа для API
    const paymentType = paymentMethodMap[paymentData.paymentMethod] || 'card_rf';

    // Формирование данных для отправки на API
    const apiPayload = {
      payment_type: paymentType,
      email: paymentData.email,
      login: paymentData.username,
      amount: paymentData.amount
    };

    console.log('🔄 Отправка платежных данных на сервер:', {
      endpoint: PAYMENT_API_ENDPOINT,
      payload: apiPayload
    });

    // Отправка запроса на API
    const response = await fetch(PAYMENT_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(apiPayload)
    });

    // Проверка статуса ответа
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(errorData.message || `HTTP Error: ${response.status}`);
    }

    // Получение результата от API
    const result = await response.json();

    // Проверка успешности платежа в ответе
    if (!result.success && !result.transactionId) {
      throw new Error(result.message || 'Ошибка при обработке платежа на сервере');
    }

    const transactionId = result.transactionId || `ASTRA-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    console.log('✅ Платеж успешно обработан:', {
      transactionId,
      amount: paymentData.amount,
      email: paymentData.email
    });

    return {
      success: true,
      transactionId,
      message: result.message || `Платеж успешно обработан. ID транзакции: ${transactionId}`
    };

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка при обработке платежа';
    console.error('❌ Ошибка обработки платежа:', errorMessage);
    throw new Error(errorMessage);
  }
};

/**
 * Проверка статуса платежа
 */
export const checkPaymentStatus = async (transactionId: string): Promise<{ status: string; message: string }> => {
  try {
    if (!transactionId) {
      throw new Error('ID транзакции не указан');
    }

    const statusEndpoint = `${PAYMENT_API_ENDPOINT}/status/${transactionId}`;
    console.log('🔍 Проверка статуса платежа:', transactionId);

    const response = await fetch(statusEndpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const result = await response.json();

    return {
      status: result.status || 'unknown',
      message: result.message || 'Платеж обрабатывается'
    };

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Ошибка при проверке статуса';
    console.error('❌ Ошибка проверки статуса:', errorMessage);
    throw new Error(errorMessage);
  }
};

/**
 * Возврат платежа (рефанд)
 */
export const refundPayment = async (transactionId: string, reason: string): Promise<{ refundId: string; message: string }> => {
  try {
    if (!transactionId || !reason) {
      throw new Error('Укажите ID транзакции и причину возврата');
    }

    const refundPayload = {
      transactionId,
      reason,
      timestamp: new Date().toISOString()
    };

    const refundEndpoint = `${PAYMENT_API_ENDPOINT}/refund`;
    console.log('💰 Отправка запроса на возврат:', refundPayload);

    const response = await fetch(refundEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(refundPayload)
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const result = await response.json();
    const refundId = result.refundId || `REFUND-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    console.log('✅ Возврат успешно инициирован:', refundId);

    return {
      refundId,
      message: result.message || `Возврат успешно инициирован. ID возврата: ${refundId}`
    };

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Ошибка при обработке возврата';
    console.error('❌ Ошибка возврата платежа:', errorMessage);
    throw new Error(errorMessage);
  }
};
