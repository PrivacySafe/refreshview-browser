var regedit = require('regedit')

var installPath = process.execPath

var keysToCreate = [
  'HKCU\\Software\\Classes\\RefreshView',
  'HKCU\\Software\\Classes\\RefreshView\\Application',
  'HKCU\\Software\\Classes\\RefreshView\\DefaulIcon',
  'HKCU\\Software\\Classes\\RefreshView\\shell\\open\\command',
  'HKCU\\Software\\Clients\\StartMenuInternet\\RefreshView\\Capabilities\\FileAssociations',
  'HKCU\\Software\\Clients\\StartMenuInternet\\RefreshView\\Capabilities\\StartMenu',
  'HKCU\\Software\\Clients\\StartMenuInternet\\RefreshView\\Capabilities\\URLAssociations',
  'HKCU\\Software\\Clients\\StartMenuInternet\\RefreshView\\DefaultIcon',
  'HKCU\\Software\\Clients\\StartMenuInternet\\RefreshView\\InstallInfo',
  'HKCU\\Software\\Clients\\StartMenuInternet\\RefreshView\\shell\\open\\command'
]

var registryConfig = {
  'HKCU\\Software\\RegisteredApplications': {
    Min: {
      value: 'Software\\Clients\\StartMenuInternet\\RefreshView\\Capabilities',
      type: 'REG_SZ'
    }
  },
  'HKCU\\Software\\Classes\\RefreshView': {
    default: {
      value: 'Min Browser Document',
      type: 'REG_DEFAULT'
    }
  },
  'HKCU\\Software\\Classes\\RefreshView\\Application': {
    ApplicationIcon: {
      value: installPath + ',0',
      type: 'REG_SZ'
    },
    ApplicationName: {
      value: 'Min',
      type: 'REG_SZ'
    },
    AppUserModelId: {
      value: 'Min',
      type: 'REG_SZ'
    }
  },
  'HKCU\\Software\\Classes\\RefreshView\\DefaulIcon': {
    ApplicationIcon: {
      value: installPath + ',0',
      type: 'REG_SZ'
    }
  },
  'HKCU\\Software\\Classes\\RefreshView\\shell\\open\\command': {
    default: {
      value: '"' + installPath + '" "%1"',
      type: 'REG_DEFAULT'
    }
  },
  'HKCU\\Software\\Classes\\.htm\\OpenWithProgIds': {
    Min: {
      value: 'Empty',
      type: 'REG_SZ'
    }
  },
  'HKCU\\Software\\Classes\\.html\\OpenWithProgIds': {
    Min: {
      value: 'Empty',
      type: 'REG_SZ'
    }
  },
  'HKCU\\Software\\Clients\\StartMenuInternet\\RefreshView\\Capabilities\\FileAssociations': {
    '.htm': {
      value: 'Min',
      type: 'REG_SZ'
    },
    '.html': {
      value: 'Min',
      type: 'REG_SZ'
    }
  },
  'HKCU\\Software\\Clients\\StartMenuInternet\\RefreshView\\Capabilities\\StartMenu': {
    StartMenuInternet: {
      value: 'Min',
      type: 'REG_SZ'
    }
  },
  'HKCU\\Software\\Clients\\StartMenuInternet\\RefreshView\\Capabilities\\URLAssociations': {
    http: {
      value: 'Min',
      type: 'REG_SZ'
    },
    https: {
      value: 'Min',
      type: 'REG_SZ'
    }
  },
  'HKCU\\Software\\Clients\\StartMenuInternet\\RefreshView\\DefaultIcon': {
    default: {
      value: installPath + ',0',
      type: 'REG_DEFAULT'
    }
  },
  'HKCU\\Software\\Clients\\StartMenuInternet\\RefreshView\\InstallInfo': {
    IconsVisible: {
      value: 1,
      type: 'REG_DWORD'
    }
  },
  'HKCU\\Software\\Clients\\StartMenuInternet\\RefreshView\\shell\\open\\command': {
    default: {
      value: installPath,
      type: 'REG_DEFAULT'
    }
  }
}

var registryInstaller = {
  install: function () {
    return new Promise(function (resolve, reject) {
      regedit.createKey(keysToCreate, function (err) {
        regedit.putValue(registryConfig, function (err) {
          if (err) {
            reject()
          } else {
            resolve()
          }
        })
      })
    })
  },
  uninstall: function () {
    return new Promise(function (resolve, reject) {
      regedit.deleteKey(keysToCreate, function (err) {
        if (err) {
          reject()
        } else {
          resolve()
        }
      })
    })
  }
}
