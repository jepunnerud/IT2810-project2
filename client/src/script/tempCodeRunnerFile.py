    for i in range(1, 16):
        ingredient_key = f"strIngredient{i}"
        measure_key = f"strMeasure{i}"
        ingredient = drink.get(ingredient_key)
        measure = drink.get(measure_key)

        if ingredient:
            transformed_drink["ingredients"].append({
                "ingredient": ingredient,
                "measure": measure if measure else ""
            })

    # Append the transformed drink to the list
    transformed_data.append(transformed_drink)

# Create a new dictionary with the "drinks" key and the transformed data
transformed_json = {"drinks": transformed_data}

# Convert the dictionary to a JSON string
formatted_json = json.dumps(transformed_json, indent=2)

# Print the formatted JSON
print(formatted_json)