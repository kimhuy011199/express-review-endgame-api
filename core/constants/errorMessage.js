const ERROR_MSG = {
  COMMON: {
    VALIDATE_FAIL: 'Validation failed',
    INVALID_ID: 'Invalid ID',
    UNAUTHENTICATED: 'Unauthenticated',
    INVALID_TOKEN: 'Invalid token',
    PERMISSION_DENIED: 'Permission denied',
  },
  REVIEW: {
    NOT_FOUND: 'Review not found',
    TITLE_MIN_LENGTH: 'Title must be at least 5 chars long',
    CONTENT_MIN_LENGTH: 'Content must be at least 10 chars long',
    STARS_RANGE: 'Stars must be an integer in range 1 to 5',
  },
  USER: {
    EXISTED_EMAIL: 'Email address already exists',
    INVALID_EMAIL: 'Invalid email',
    INVALID_PASSWORD: 'Invalid password',
    PASSWORD_NUMBER: 'Password must be at least 1 number',
    PASSWORD_LENGTH: 'Password must be at least 6 chars long',
    USERNAME_LENGTH: 'Username must be at least 5 chars long',
  },
};

module.exports = { ERROR_MSG };
