class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def index

  end

  def finish
    # flash[:success] = 'Thanks for participating'
    ab_finish('ruby_button')
    redirect_to 'http://192.168.100.84:3001/users/sign_up'
  end
end
