module ApplicationHelper
  #including the following methods from devise so sign-in/sign-out are available anywhere
  def resource_name
    :user
  end

  def resource
    @resource ||= User.new
  end

  def devise_mapping
    @devise_mapping ||= Devise.mappings[:user]
  end

  def after_sign_in_path_for(resource)
    '/user_sales'
  end
end