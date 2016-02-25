var prompt = require('prompt');
var fs = require('fs');

const schema = {
    properties:
    {
        SSH_USER: {
            required: true
        },
        SSH_PASSWORD: {
            required: true,
            hidden: true,
            replace: '*'
        },

        DEPLOY_HOST: {
            required: true,
            format: 'host-name'
        },
        DEPLOY_PATH: {
            required: true
        }
    }
};

prompt.start();

prompt.get(schema, function (err, result) {
    console.dir(result);
    var envStr = '';
    Object.keys(result).forEach(function(key) {
        var val = result[key];
        envStr += key+'='+val+'\n';
    });

    fs = require('fs');
    fs.writeFile('.env', envStr, function (err) {
        if (err)
            return console.log(err);
        console.log('.env file saved');
    });
});