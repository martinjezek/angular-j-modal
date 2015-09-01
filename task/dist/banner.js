'use strict';

module.exports = function(gulp, plug) {

    plug.banner = ['/*!',
        ' * <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)',
        ' * <%= pkg.author.name %> <<%= pkg.author.email %>>',
        ' */',
    ''].join('\n');

};
