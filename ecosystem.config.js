module.exports = {
    apps:[
        {
            name          :'Web',
            script        :'./bin/www',
            watch         :false,
            env           :{
                'PORT'    :3034,
                'NODE_ENV':'development'
            },
            env_production:{
                'PORT'    :3034,
                'NODE_ENV':'production'
            }
        }
    ]
};