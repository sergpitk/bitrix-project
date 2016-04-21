<?php
/*
 * This file has been generated automatically.
 * Please change the configuration for correct use deploy.
 */

require 'recipe/common.php';
require 'vendor/deployphp/recipes/recipes/configure.php';

date_default_timezone_set('Europe/Moscow');

// Set configurations
set('repository', '');
set('writable_dirs', []);
set('clear_use_sudo', false);
set('keep_releases', 2);
set('default_stage', 'dev');
set('shared_dirs', ['bitrix', 'upload']);

task('deploy:run_build', function(){
    run('npm install && gulp build');
});

task('copy_parent_files', function() {

    $sharedPath = "{{deploy_path}}/shared";

    foreach (get('shared_dirs') as $dir) {

        run("if [ -d $(echo {{parent_files_path}}/$dir) ]; then cp -rpf {{parent_files_path}}/$dir $sharedPath/$dir; fi");

    }

    foreach (get('shared_files') as $file) {
        $dirname = dirname($file);

        run("mkdir -p $sharedPath/" . $dirname);

        run("touch $sharedPath/$file");

        run("cp -pf {{parent_files_path}}/$file $sharedPath/$file");

    }
});

task('copy_parent_db', function() {
    run("mysqldump -h {{parent_dbhost}} -u {{parent_dbuser}} -p{{parent_dbpass}} {{parent_dbname}}  --skip-lock-tables | mysql -h {{app.mysql.host}} -u {{app.mysql.username}} -p{{app.mysql.password}} {{app.mysql.dbname}}");
});

/**
 * Main task
 */
task('deploy', [
    'deploy:prepare',
    'deploy:release',
    'deploy:update_code',
    'deploy:configure',
    'deploy:shared',
    'deploy:vendors',
    'deploy:run_build',
    'deploy:symlink',
    'deploy:clean',
    'cleanup',
])->desc('Deploy your project');
after('deploy', 'success');

serverList(__DIR__.'/servers.yml');
