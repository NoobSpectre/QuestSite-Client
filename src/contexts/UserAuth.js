export const verifyUser = () => {
  if (!localStorage.getItem('username')) return false;
  const ttl = localStorage.getItem('expiry');
  const now = Date.now();
  // console.log(now > ttl);
  if (now > ttl) {
    localStorage.clear();
    console.log('session expired');
    return false;
  }
  return true;
};

export const _getItem = key => {
  const username = localStorage.getItem(key);
  if (verifyUser()) {
    return username;
  }
  return null;
};

export const _setItem = (key, value) => {
  // if ttl value changed, also change maxAge value at line 10 in 'server/utils/auth.js'
  const ttl = 60 * 60; // 1 hour login time

  if (!localStorage.getItem('expiry')) {
    const expiry = Date.now() + ttl * 1000; // in milliseconds
    localStorage.setItem('expiry', JSON.stringify(expiry));
  }
  localStorage.setItem(key, value);
};
