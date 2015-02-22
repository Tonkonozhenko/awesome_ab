class ExperimentsController < InheritedResources::Base
  before_action :authenticate_user!
  belongs_to :user
  actions :only => [:show, :index]
end
