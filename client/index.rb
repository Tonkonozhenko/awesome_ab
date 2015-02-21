require 'sinatra/base'
require 'sinatra/reloader'
require 'dotenv'
Dotenv.load

require_relative 'awesome_ab/client'

AwesomeAb::Experiment.client = AwesomeAb::Client.new

class ClientApp < Sinatra::Base
  configure :development do
    register Sinatra::Reloader
  end

  before do
    headers 'Access-Control-Allow-Origin' => '*'
  end

  get '/find' do
    session_id = params[:session_id]
    AwesomeAb::Experiment.find_all(session_id).to_json
  end

  post '/experiment' do
    name, session_id, variant = params[:name], params[:session_id], params[:variant]
    { status: AwesomeAb::Experiment.new(name, session_id, variant) ? 'ok' : 'not_ok' }.to_json
  end

  post '/finish' do
    name, session_id = params[:name], params[:session_id]
    { status: AwesomeAb::Experiment.new(name, session_id, nil, true) ? 'ok' : 'not_ok' }.to_json
  end
end