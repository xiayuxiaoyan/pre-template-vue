const IS_WIN = process.platform.indexOf('win') === 0;

module.exports = {
    transformCmd: function (cmd) {
        if (IS_WIN) {
            cmd = 'start "" "' + cmd + '"';
        } else {
            if (process.env['XDG_SESSION_COOKIE'] ||
                process.env['XDG_CONFIG_DIRS'] ||
                process.env['XDG_CURRENT_DESKTOP']) {
              cmd = 'xdg-open ' + cmd;
            } else if (process.env['GNOME_DESKTOP_SESSION_ID']) {
              cmd = 'gnome-open ' + cmd;
            } else {
              cmd = 'open ' + cmd;
            }
        }
        return cmd;
    }
};