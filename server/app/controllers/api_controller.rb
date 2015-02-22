class ApiController < ApplicationController
  def upload_data
    @user = User.where(secret_key: params[:secret_key], secret_id: params[:secret_id]).first

    if @user
      begin
        data = JSON.parse params[:data]
        data.each do |d|
          experiment = @user.experiments.where(name: d['name']).first_or_create!
          experiment_case = experiment.experiment_cases.where(number: d['variant']).first_or_create!
          experiment_result = experiment_case.experiment_results.where(session_id: d['session_id']).first
          if experiment_result
            experiment_result.update_attributes!(finished: true) if d['finished'] && !experiment_result.finished
          else
            experiment_case.experiment_results.create!(d.slice('session_id', 'finished'))
          end
        end
        render json: { status: :ok }
      rescue => ex
        render json: { status: :fail }, status: 500
      end
    else
      head 403
    end
  end
end