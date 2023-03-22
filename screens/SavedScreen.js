import * as React from 'react';
import { ScrollView, View, Pressable, StyleSheet, Text, Alert } from 'react-native';
import { BACKGROUND_COLOR, PRIMARY_COLOR, SECONDARY_COLOR } from '../Theme';
import { loadJokes, removeJoke } from '../Archive';

export default class SavedScreen extends React.Component {

    // Initializes state
    constructor(props) {
        super()
        this.state = {
            rerenderFlag: false,
            savedJokes: loadJokes(),
        }
    }

    // When the user switches to the saved tab loads updated saveJokes from Arcive.js
    componentDidMount() {
        const reset = this.props.navigation.addListener('focus', () => {
            this.setState(() => ({
                savedJokes: loadJokes()
            }))
        });
    }

    // Pops up a Dialog box that prompts the user if they want to delete the joke and calls removeJoke from Archive.js if the user clicks continue
    delete = (item) => {
        Alert.alert('Delete this joke?', '', [
            {
                text: 'Cancel',
            },
            {
                text: 'Continue', onPress: () => {
                    removeJoke(item)
                    this.setState(() => ({
                        savedJokes: loadJokes()
                    }))
                }
            },
        ]);
    }

    // Flips boolean flag which
    flip = (item) => {
        item.flipped = !item.flipped;
        this.setState((prevState) => ({
            rerenderFlag: !prevState.rerenderFlag
        }))
    }

    // Renders SavedScreen with savedJokes in a ScrollView. Each joke can be flipped to switch between the setup and punchline
    // and long pressed to delete
    render() {
        return (
            <View>
                <ScrollView>
                    {this.state.savedJokes.map((item, index) => {
                        let cardColor = item.flipped ? SECONDARY_COLOR : PRIMARY_COLOR;
                        let textColor = item.flipped ? PRIMARY_COLOR : SECONDARY_COLOR;
                        return (
                            <View style={styles.cardContainer} key={index}>
                                <Pressable
                                    style={{ ...styles.jokeCard, backgroundColor: cardColor }}
                                    key={index}
                                    onPress={() => this.flip(item)}
                                    onLongPress={() => this.delete(item)}>
                                    <Text style={{ ...styles.text, color: textColor }}>
                                        {item.flipped ? item.joke.delivery : item.joke.setup}
                                    </Text>
                                </Pressable>
                            </View>
                        );
                    })}
                </ScrollView>
            </View>
        )
    }
}

// Declares stylesheet
const styles = StyleSheet.create({
    container: {
        backgroundColor: BACKGROUND_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardContainer: {
        padding: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    jokeCard: {
        height: 400,
        width: 250,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        padding: 20,
    },
    text: {
        alignSelf: 'center',
        padding: 12,
        fontFamily: 'Montserrat_500Medium',
        fontSize: 18,

    },
})