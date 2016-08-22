<?php
use Symfony\Component\Yaml\Yaml;

require 'vendor/autoload.php';
require 'recipe/common.php'; // asumes deployer installed globally
require 'vendor/deployphp/recipes/recipes/configure.php'; 

// Set deployment configuration
set('repository', '');
set('writable_dirs', []); 
set('clear_paths', []);
set('clear_use_sudo', false);
set('keep_releases', 5);
set('default_stage', 'dev');
set('shared_dirs', ['src/s1/bitrix', 'src/s1/upload']);
set('sync_excludes', ['cache', 'managed_cache', 'stack_cache', 'resize_cache', 'tmp']);
set('shared_files', ['']);

option('source-server', null, \Symfony\Component\Console\Input\InputOption::VALUE_OPTIONAL, 'Server to get data from.');

task("sync:db", function(){

	$serverList = $serverInfo = Yaml::parse(file_get_contents(__DIR__.'/stage/servers.yml'));

	$sourceServerKey = null;
	if (input()->hasOption('source-server')) {
        $sourceServerKey = input()->getOption('source-server');
    }

    $sourceServer = $serverList[$sourceServerKey];
    $destServer = $serverList[env('server.name')];

	runLocally("ssh {$sourceServer['user']}@{$sourceServer['host']} 'mysqldump -h {$sourceServer['app']['mysql']['host']} -u {$sourceServer['app']['mysql']['username']} -p{$sourceServer['app']['mysql']['password']} {$sourceServer['app']['mysql']['dbname']}  --skip-lock-tables --add-drop-table' | mysql -h {$destServer['app']['mysql']['host']} -u{$destServer['app']['mysql']['username']}  -p{$destServer['app']['mysql']['password']} {$destServer['app']['mysql']['dbname']}");

})->onlyOn('dev');

task('deploy', [
    'deploy:prepare',
    'deploy:release',
    'deploy:update_code',
    'deploy:shared',
    'deploy:configure',
    'deploy:vendors',
    'deploy:symlink',
    'deploy:clean',
    'cleanup',
])->desc('Deploy your project');
after('deploy', 'success');

serverList(__DIR__.'/stage/servers.yml');