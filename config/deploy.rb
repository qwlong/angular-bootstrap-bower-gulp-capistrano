# config valid only for current version of Capistrano
lock '3.4.0'

set :application, 'webapp'
set :repo_url, 'git@github.com:qwlong/angular-bootstrap-bower-gulp-capistrano.git'

# Default branch is :master
ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
set :deploy_to, '/home/webapp/projects/webapp'

# Default value for :scm is :git
# set :scm, :git
# set :scm, :copy

# Default value for :format is :pretty
# set :format, :pretty

# Default value for :log_level is :debug
# set :log_level, :debug

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
#set :linked_files, fetch(:linked_files, []).push('gulpfile.js', 'src/js/config.js')
set :linked_files, fetch(:linked_files, []).push('src/js/config.js')

# Default value for linked_dirs is []
set :linked_dirs, fetch(:linked_dirs, []).push('bower_components', 'node_modules', 'config')

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for keep_releases is 5
# set :keep_releases, 5

set :gulp_file, -> { release_path.join('gulpfile.js') }

namespace :deploy do

  before :updated, 'gulp'
  after :restart, :clear_cache do
    on roles(:web), in: :groups, limit: 3, wait: 10 do
      # Here we can do anything such as:
      # within release_path do
      #   execute :rake, 'cache:clear'
      # end
    end
  end

end
