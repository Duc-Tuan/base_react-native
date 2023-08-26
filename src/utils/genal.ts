/* eslint-disable curly */
export const isValidEmail = (email?: string): boolean | string => {
  if (!email) return 'Email không được bỏ trống!';
  const mail = email?.toLowerCase();
  const localIndex = mail?.indexOf('@');
  const cutLocal = mail?.slice(0, localIndex);
  const regexCharacter: RegExp = /^[a-zA-Z0-9._-]+$/;
  const regexLastCharacter: RegExp = /^[a-z0-9]+$/;
  const regexFormat: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (cutLocal?.length < 4 || cutLocal?.length > 64)
    return 'Độ dài tên người dùng không nằm trong khoảng 4 - 64 kí tự!';
  if (!regexCharacter.test(cutLocal))
    return 'Tên người dùng trong email chỉ chấp nhận ký tự chữ, số, gạch dưới, dấu chấm và gạch ngang!';
  if (!regexLastCharacter.test(mail?.slice(mail?.length - 1, mail?.length)))
    return 'Ký tự cuối của tên người dùng trong email phải là chữ hoặc số [0-9]!';
  if (!regexFormat.test(mail)) return 'Định dạng email không hợp lệ!';

  return true;
};

export const isValidPhone = (phone?: string): boolean | string => {
  if (!phone) return 'Số điện thoại không được bỏ trống!';
  if (phone?.length > 11) return 'Định dạng số điện thoại không hợp lệ!';
  const regex = /^(?:84|0)(2|3|5|7|8|9)\d{8}$/i;
  if (!regex.test(phone)) return 'Định dạng số điện thoại không hợp lệ!';
  return true;
};

export const checkStrLength = (data?: string) => {
  if (!data || data == '' || data?.trim()?.length == 0) return null;
  return data;
};

export const regexPassword = (value: string): boolean => {
  const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{8,}$/;
  const check = regex.test(value);
  if (check) {
    return true;
  } else return false;
};

export const convertPrice = (value: number, type: string) => {
  if (type === 'percent') {
    return value / 100;
  }
  return value;
};
