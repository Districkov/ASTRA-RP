/**
 * ASTRA-RP Configuration File
 * Конфигурационный файл для ASTRA-RP проекта
 * 
 * Используйте этот файл для централизованного управления:
 * - Курсами валют
 * - Пределами платежей
 * - Контактной информацией
 * - Правилами валидации
 */

// ============================================
// КУРСЫ ВАЛЮТ И ПЛАТЕЖИ
// ============================================

export const EXCHANGE_RATES = {
  // Основной курс обмена
  MAIN_RATE: "1₽ = 2$ = 300 игровой валюты",
  
  // Коэффициенты для расчета
  RUBLE_TO_DOLLAR: 2,
  RUBLE_TO_GAME_CURRENCY: 300,
  DOLLAR_TO_GAME_CURRENCY: 150,
} as const;

// Пределы платежей
export const PAYMENT_LIMITS = {
  MIN_AMOUNT: 10, // Минимум в рублях
  MAX_AMOUNT: 50000, // Максимум в рублях
} as const;

// Доступные способы оплаты
export const PAYMENT_METHODS = [
  { id: 'card', label: 'Банковская карта' },
  { id: 'sbp', label: 'СБП' },
  { id: 'qiwi', label: 'QIWI' },
  { id: 'yoomoney', label: 'ЮMoney' },
  { id: 'crypto', label: 'Криптовалюта' },
] as const;

// ============================================
// КОНТАКТНАЯ ИНФОРМАЦИЯ
// ============================================

export const CONTACT_INFO = {
  EMAIL: {
    PRIVACY: 'support@astra-rp.fun',
    SUPPORT: 'support@astra-rp.fun',
    OFFERS: 'support@astra-rp.fun',
  },
  
  SOCIAL: {
    DISCORD: 'https://discord.gg/WMa32mvWhg',
    VK: 'https://vk.com/astra-rp',
    YOUTUBE: 'https://www.youtube.com/@AstraRP-gta5',
    TELEGRAM: 'https://t.me/astrarp5',
  },
  
  WEBSITE: {
    FORUM: 'https://forum.astra-rp.fun',
    MAIN: 'https://astra-rp.fun',
  },
  
  SERVER: {
    CONNECT_COMMAND: 'connect astrapp.com',
    DISPLAY_ADDRESS: 'astrapp.com',
  },
  
  PHONE: '+7 (926) 718-55-52',
} as const;

// ============================================
// ПРАВИЛА ВАЛИДАЦИИ
// ============================================

export const VALIDATION_RULES = {
  // Email
  EMAIL: {
    MIN_LENGTH: 5,
    MAX_LENGTH: 100,
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    ERROR_MESSAGES: {
      REQUIRED: 'Email обязателен',
      INVALID: 'Некорректный формат email',
      TOO_LONG: 'Email слишком длинный (максимум 100 символов)',
    },
  },

  // Username (никнейм)
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 32,
    PATTERN: /^[a-zA-Z0-9_-]+$/, // Буквы, цифры, подчеркивание, дефис
    ERROR_MESSAGES: {
      REQUIRED: 'Имя пользователя обязательно',
      TOO_SHORT: 'Имя пользователя должно быть не менее 3 символов',
      TOO_LONG: 'Имя пользователя не может быть более 32 символов',
      INVALID: 'Имя может содержать только буквы, цифры, подчеркивание и дефис',
    },
  },

  // Amount (сумма платежа)
  AMOUNT: {
    MIN: 10,
    MAX: 50000,
    ERROR_MESSAGES: {
      REQUIRED: 'Укажите сумму',
      TOO_LOW: `Минимальная сумма ${10}₽`,
      TOO_HIGH: `Максимальная сумма ${50000}₽`,
      NOT_INTEGER: 'Сумма должна быть целым числом',
    },
  },

  // Payment Method
  PAYMENT_METHOD: {
    ERROR_MESSAGES: {
      REQUIRED: 'Выберите способ оплаты',
    },
  },

  // Checkboxes (согласия)
  CHECKBOXES: {
    ERROR_MESSAGES: {
      ALL_REQUIRED: 'Пожалуйста, согласитесь со всеми условиями и документами',
    },
  },
} as const;

// ============================================
// ПРЕДВАРИТЕЛЬНО УСТАНОВЛЕННЫЕ СУММЫ
// ============================================

export const PRESET_AMOUNTS = [100, 500, 1000, 2500, 5000] as const;

// ============================================
// СООБЩЕНИЯ И ТЕКСТ
// ============================================

export const MESSAGES = {
  // Успех
  SUCCESS: {
    PAYMENT_CREATED: (amount: number, gameBalance: number) =>
      `✓ Платеж на сумму ${amount}₽ успешно создан! Вы получите ${gameBalance} игровой валюты. Спасибо за поддержку ASTRA-RP!`,
  },

  // Ошибки
  ERROR: {
    VALIDATION_FAILED: 'Ошибка валидации: ',
    PAYMENT_FAILED: 'Произошла ошибка при обработке платежа. Попробуйте позже.',
    NETWORK: 'Ошибка сети. Проверьте подключение к интернету.',
  },

  // Уведомления
  NOTIFICATIONS: {
    PROCESSING: 'Обработка...',
    REDIRECT_TO_PAYMENT: 'Перейти к оплате',
  },

  // Безопасность
  SECURITY: {
    BADGE: 'БЕЗОПАСНЫЕ ПЛАТЕЖИ',
    PAYMENT_SECURITY: 'Все транзакции защищены современными методами шифрования',
    INSTANT_DELIVERY: 'Средства поступают на ваш счет сразу после подтверждения платежа',
  },
} as const;

// ============================================
// МАРШРУТЫ ПРИЛОЖЕНИЯ
// ============================================

export const ROUTES = {
  HOME: '/',
  DONATE: '/donate',
  PRIVACY_POLICY: '/privacy-policy',
  TERMS_OF_SERVICE: '/terms-of-service',
  OFFER_AGREEMENT: '/offer-agreement',
} as const;

// ============================================
// СТАТУСЫ ПЛАТЕЖЕЙ
// ============================================

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SUCCESS: 'success',
  ERROR: 'error',
  CANCELED: 'canceled',
} as const;

// ============================================
// ТИПЫ ДАННЫХ
// ============================================

export interface ValidationError {
  field: string;
  message: string;
}

export interface DonateFormData {
  email: string;
  username: string;
  amount: number;
  paymentMethod: string;
}

export interface PaymentStatus {
  type: 'success' | 'error' | null;
  message: string;
}

// ============================================
// УТИЛИТЫ ДЛЯ РАСЧЕТОВ
// ============================================

/**
 * Рассчитывает количество игровой валюты для заданной суммы в рублях
 * @param amount Сумма в рублях
 * @returns Количество игровой валюты
 */
export const calculateGameCurrency = (amount: number): number => {
  return amount * EXCHANGE_RATES.RUBLE_TO_GAME_CURRENCY;
};

/**
 * Рассчитывает сумму в долларах для заданной суммы в рублях
 * @param amount Сумма в рублях
 * @returns Сумма в долларах
 */
export const calculateDollarAmount = (amount: number): number => {
  return amount * EXCHANGE_RATES.RUBLE_TO_DOLLAR;
};

/**
 * Форматирует число как валюту
 * @param amount Сумма
 * @param currency Валюта (₽, $, и т.д.)
 * @returns Отформатированная строка
 */
export const formatCurrency = (amount: number, currency: string = '₽'): string => {
  return `${amount.toLocaleString('ru-RU')}${currency}`;
};

// ============================================
// ЭКСПОРТ ДЛЯ ИСПОЛЬЗОВАНИЯ В КОМПОНЕНТАХ
// ============================================

export default {
  EXCHANGE_RATES,
  PAYMENT_LIMITS,
  PAYMENT_METHODS,
  CONTACT_INFO,
  VALIDATION_RULES,
  PRESET_AMOUNTS,
  MESSAGES,
  ROUTES,
  PAYMENT_STATUS,
  calculateGameCurrency,
  calculateDollarAmount,
  formatCurrency,
};
