module.exports = {
    apps:[
        {
            name          :'Admin',
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