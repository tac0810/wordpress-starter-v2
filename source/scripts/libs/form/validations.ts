/**
 * 半角数
 */
export const REGEXP_NUMBER = /^[0-9]+$/;

/**
 *
 * メールアドレス
 */
export const REGEXP_EMAIL =
  /^[0-9,A-Z,a-z][0-9,a-z,A-Z,_,\.,\-,\+]+@[0-9,A-Z,a-z][0-9,a-z,A-Z,\.,\-]+\.[a-z]+$/;

/**
 * 半角英
 */
export const REGEXP_ALPHABET = /^[a-zA-Z]+$/;

/**
 * 半角英数
 */
export const REGEXP_ALPHANUMERIC = /^[0-9A-Za-z]+$/;

/**
 * 全角文字 (半角以外)
 */
export const REGEXP_ZENKAKU = /^[^\x01-\x7E\xA1-\xDF]+$/;

/**
 * 全角カタカナ
 */
export const REGEXP_KATAKANA = /^[ァ-ヶー　]*$/;

/**
 * 全角ひらがな
 */
export const REGEXP_KANA = /^ぁ-ん/;

/**
 * 電話番号
 */
export const REGEXP_PHONENUMBER = /^0\d{1,3}-?\d{2,4}-?\d{3,4}$/;

/**
 * 電話番号(xxx-xxxx-xxxx)
 */
export const REGEXP_PHONENUMBER_WITH_HYPHEN = /^0\d{1,3}-\d{2,4}-\d{3,4}$/;

/**
 * 郵便番号
 */
export const REGEXP_ZIPCODE = /^〒?(\s*?)(\d{7}|\d{3}-\d{4})$/;

export function between(value: string | number, from: number, to: number): boolean {
  const len = String(value).length;
  return from <= len && len <= to;
}

export function minLength(value: string | number, min: number): boolean {
  const len = String(value).length;
  return Number(min) <= len;
}

export function maxLength(value: string | number, max: number): boolean {
  let len = String(value).length;
  return len <= Number(max);
}

export function pattern(value: string | number, pattern: RegExp) {
  return pattern.test(String(value));
}

export function isEmpty(value: string | number | any[] | {} | null | undefined): boolean {
  if (typeof value === "string") {
    return "" === value;
  } else if (value instanceof Array) {
    return value.length === 0;
  } else if (value instanceof Object) {
    return Object.keys(value).length === 0;
  } else {
    return !value;
  }
}
