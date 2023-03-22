import * as React from 'react';
import { View, Pressable, StyleSheet, Text } from 'react-native';
import { BACKGROUND_COLOR, PRIMARY_COLOR } from '../Theme';


// CategoriesScreen Component
export default function CategoriesScreen(props) {

    // Navigates to JokeScreen and passes the input of the user as the category
    const handleCategory = (category) => {
        props.navigation.navigate('JokeScreen', { category });
    }

    // Renders CategoriesScreen
    return (
        <View style={styles.container}>
            <View style={styles.categories}>
                <View style={styles.row}>
                    <Pressable style={styles.category} onPress={() => handleCategory('Miscellaneous')}><Text style={styles.categoryText}>All</Text></Pressable>
                    <Pressable style={styles.category} onPress={() => handleCategory('Family Friendly')}><Text style={styles.categoryText}>Family Friendly</Text></Pressable>
                </View>

                <View style={styles.row}>
                    <Pressable style={styles.category} onPress={() => handleCategory('Spooky')}><Text style={styles.categoryText}>Spooky</Text></Pressable>
                    <Pressable style={styles.category} onPress={() => handleCategory('Dark')}><Text style={styles.categoryText}>Dark</Text></Pressable>
                </View>


                <View style={styles.row}>
                    <Pressable style={styles.category} onPress={() => handleCategory('Programming')}><Text style={styles.categoryText}>Programming</Text></Pressable>
                    <Pressable style={styles.category} onPress={() => handleCategory('Pun')}><Text style={styles.categoryText}>Puns</Text></Pressable>
                </View>
            </View>
        </View>
    )
}

// Declares styleSheet
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
    },
    categories: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    row: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    category: {
        backgroundColor: PRIMARY_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: BACKGROUND_COLOR,
        borderWidth: 5,
        height: 150,
        width: 150
    },
    categoryText: {
        color: BACKGROUND_COLOR,
        fontSize: 15,
        fontFamily: 'Montserrat_500Medium'
    }
})
