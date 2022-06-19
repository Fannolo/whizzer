//
//  Dish.swift
//  whizzer-native
//
//  Created by Diego Carlino on 13/06/22.
//

import Foundation
import FirebaseFirestoreSwift

struct Dish: Identifiable, Codable {
    @DocumentID var id: String?
    var code: String
    var item: String
    var price: String
    var ingredients: String
    var allergens: String
    var kind: String
    var quantity: String
}
