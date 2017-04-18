<?php
namespace Deployer;

require('recipe/common.php');
require('vendor/regiomedia/deployer-recipe-check/check.php');
require('vendor/regiomedia/deployer-recipe-sync/sync.php');

set('ssh_type', 'native');
set('ssh_multiplexing', true);

set('repository', 'git@domain.com:username/repository.git');
set('shared_dirs', ['core/bitrix', 'core/upload']);
set('restart_cmd', 'sudo /usr/sbin/service apache2 restart');

task('deploy:migrate', function() {
    cd('{{release_path}}');
    $output = run( '{{bin/php}} migrator migrate');
    writeln('<info>' . $output . '</info>');
});

task('deploy:restart', function() {
    run('{{restart_cmd}}');
});

before('deploy:release', 'check:uncommited');
before('deploy:release', 'check:unpushed');

task('sync:dirs')->onlyOn(['staging', 'dev']);
task('sync:db')->onlyOn(['staging', 'dev']);

after('deploy:release', 'sync');

task('deploy', [
    'deploy:prepare',
    'deploy:release',
    'deploy:update_code',
    'deploy:shared',
    'deploy:vendors',
    'deploy:migrate',
    'deploy:symlink',
    'deploy:restart',
    'cleanup',
]);