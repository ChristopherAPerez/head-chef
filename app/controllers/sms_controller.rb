class SmsController < ApplicationController
    wrap_parameters format: []


    def send_sms
        number = params[:number]
        menu = Menu.find_by(publish: false)
        if menu.recipes.length == 3
            recipes = menu.recipes
            breakfast = recipes.first
            lunch = recipes.second
            dinner = recipes.third

            account_sid = ''
            auth_token = ''
            @client = Twilio::REST::Client.new(account_sid, auth_token)
            @client.messages.create(
            from: '18883505894',
            to: number,
            body: "┎┈┈┈┈┈┈┈୨♡୧┈┈┈┈┈┈┈┒
                         #{breakfast.recipe_name}, 
                         #{breakfast.description}, 
                         #{lunch.recipe_name}, 
                        #{lunch.description}, 
                        #{dinner.recipe_name}, 
                        #{dinner.description}
    ┖┈┈┈┈┈┈┈୨♡୧┈┈┈┈┈┈┈┚"
            )
            render json: { message: 'SMS sent successfully' }
        else
            render json: { error: "Incomplete Menu" }, status: :unprocessable_entity
        end
    end

    private

    def recipe_params
        params.permit(:recipe_name, :meal, :description, :calories, :prep_time, :recipe_pic, :user_id, :active, steps: [], ingredients: [])
    end

    def number_params
        params.permit(:number)
    end

end
