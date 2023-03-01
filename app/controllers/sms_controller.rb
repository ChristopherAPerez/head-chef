class SmsController < ApplicationController

    def send_sms

        recipe = Recipe.new(recipe_params)

        number = params[:number]

        combine = {
            {
                "recipe" => recipe
                "number" => number
            }
        }

        render json: combine

        # menu = Menu.find_by(publish: false)
        # if menu.recipes.length == 3
        # recipes = menu.recipes
        # breakfast = recipes.first
        # lunch = recipes.second
        # dinner = recipes.third

        

#         account_sid = 'ACdd3de881cdefeb09e36353166e7bd802'
#         auth_token = 'eb2a18f7dbcd287bf8bdaf48401267ef'
#         @client = Twilio::REST::Client.new(account_sid, auth_token)
#         @client.messages.create(
#         from: '18883505894',
#         to: '16464962187',
#         body: "┎┈┈┈┈┈┈┈୨♡୧┈┈┈┈┈┈┈┒
#                      #{breakfast.recipe_name}, 
#                      #{breakfast.description}, 
#                      #{lunch.recipe_name}, 
#                      #{lunch.description}, 
#                      #{dinner.recipe_name}, 
#                      #{dinner.description}
# ┖┈┈┈┈┈┈┈୨♡୧┈┈┈┈┈┈┈┚"
#         )
#         render json: { message: 'SMS sent successfully' }
        # else
        #     render json: { error: "Incomplete menu" }, status: :unprocessable_entity
        # end

#         account_sid = 'ACdd3de881cdefeb09e36353166e7bd802'
#         auth_token = 'eb2a18f7dbcd287bf8bdaf48401267ef'
#         @client = Twilio::REST::Client.new(account_sid, auth_token)
#         @client.messages.create(
#         from: '18883505894',
#         to: '16464962187',
#         body: `┎┈┈┈┈┈┈┈୨♡୧┈┈┈┈┈┈┈┒
#                      #{breakfast.recipe_name}, 
#                      #{breakfast.description}, 
#                      #{lunch.recipe_name}, 
#                      #{lunch.description}, 
#                      #{dinner.recipe_name}, 
#                      #{dinner.description}
# ┖┈┈┈┈┈┈┈୨♡୧┈┈┈┈┈┈┈┚`
#         )
#         render json: { message: 'SMS sent successfully' }

    end

    private

    def recipe_params
        params.permit(:recipe_name, :meal, :description, :calories, :prep_time, :recipe_pic, :user_id, :active, steps: [], ingredients: [])
    end

    def number_params
        params.permit(:number)
    end

end
