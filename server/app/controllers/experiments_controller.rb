class ExperimentsController < InheritedResources::Base
  before_action :authenticate_user!
  actions :only => [:show, :index]

  def index
    collection
  end

  protected
  def begin_of_association_chain
    current_user
  end
end
