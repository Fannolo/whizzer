//
//  DishView.swift
//  whizzer-native
//
//  Created by Diego Carlino on 16/06/22.
//

import SwiftUI

struct DishView: View {
    var dish: Dish
    
    var body: some View {
        VStack {
            FirebaseImage(imageName: dish.code)
                .frame(width: 600, height: 300)
                .cornerRadius(10.0)
            Text(dish.item)
            HStack {
                Text(dish.code)
                Text("-")
                Text(dish.quantity)
            }
            Text(dish.ingredients)
            HStack {
                Text(dish.price)
                Text(dish.allergens)
                Text(dish.kind)
            }
        }
    }
}

struct DishView_Previews: PreviewProvider {
    static var previews: some View {
        DishView(dish: DishManager().dishes[0])
    }
}
