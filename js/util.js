/**
 * 说明：工具类
 */
var Util = {
  checkUserInStorage: function (loginName) {
    var mpOpenUserNames = localStorage.getItem('mpOpenUserNames');
    if (mpOpenUserNames) {
      var loginNameAy = mpOpenUserNames.split(',');
      var loginNameAyLen = loginNameAy.length;
      for (var i = 0; i < loginNameAyLen; i++) {
        var getLoginName = loginNameAy[i];
        if (getLoginName == loginName) {
          return true;
        }
      }
    }
  },
  setUnUpdateStorage: function (loginName) {
    var mpOpenUserNames = localStorage.getItem('mpOpenUserNames');
    var loginNameAy = [];
    if (mpOpenUserNames) {
      loginNameAy = mpOpenUserNames.split(',');
      var loginNameAyLen = loginNameAy.length;
      for (var i = 0; i < loginNameAyLen; i++) {
        var getLoginName = loginNameAy[i];
        if (getLoginName == loginName) {
          return;
        }
      }
    }
    loginNameAy.push(loginName);
    localStorage.setItem('mpOpenUserNames', loginNameAy);
  },
  clearUnUpdateStorage: function (loginName) {
    var mpOpenUserNames = localStorage.getItem('mpOpenUserNames');
    if (mpOpenUserNames) {
      var loginNameAy = mpOpenUserNames.split(',');
      var loginNameAyLen = loginNameAy.length;
      if (loginNameAyLen) {
        for (var i = 0; i < loginNameAyLen; i++) {
          var getLoginName = loginNameAy[i];
          if (getLoginName == loginName) {
            loginNameAy.splice(i, 1);
            break;
          }
        }
        localStorage.setItem('mpOpenUserNames', loginNameAy);
      }
    }
  },
  findDifKey (obj1, obj2) {
    const keys = [];
    Object.keys(obj1).forEach(key => {
      if (obj2[key] !== obj1[key]) {
        keys.push({
          key,
          value1: obj1[key],
          value2: obj2[key]
        });
      }
    });
    return keys;
  }
};
