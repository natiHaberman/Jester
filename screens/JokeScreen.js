import * as React from 'react';
import { View, Pressable, StyleSheet, Text, Alert } from 'react-native';
import { BACKGROUND_COLOR, PRIMARY_COLOR, SECONDARY_COLOR } from '../Theme';
import { addJoke } from '../Archive';

// Declares constants
const LOADING_TEXT = 'Loading...'

// Component that shows jokes loaded from jokeapi.dev
export default class JokeScreen extends React.Component {

    // Initializes state
    constructor(props) {
        super()
        this.state = {
            category: null,
            joke: null,
            flipped: false,
            text: null,
            cardColor: PRIMARY_COLOR,
            textColor: SECONDARY_COLOR,

        }
    }

    // Sets State of category to the category that the user chose in CategoriesScreen
    componentDidMount = () => {
        this.setState({ category: this.props.navigation.getState().routes[1].params.category });
    }

    // Upon initialization calls newJoke to fetch joke and initialize state's joke and text
    componentDidUpdate = () => {
        if (!this.state.joke)
            this.newJoke();
    }

    // Flips the card displaying the joke to show the punchline. If already flipped loads new joke and displays its setup instead
    flip = () => {
        if (!this.state.flipped) {
            this.setState(prevState => ({
                flipped: true,
                text: prevState.joke.delivery,
                cardColor: SECONDARY_COLOR,
                textColor: PRIMARY_COLOR
            }));
        }
        else this.newJoke();
    }

    // Fetches a joke from jokeapi.dev. If the user chose 'Family Friendly' than a joke without offensive content, else by category.
    // then it updates the state accordingly
    newJoke = async () => {
        const category = this.state.category;
        let url;
        if (this.state.category === 'Family Friendly') {
            url = 'https://v2.jokeapi.dev/joke/Miscellaneous,Pun,Spooky?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart'
        }
        else {
            url = `https://v2.jokeapi.dev/joke/${category}?type=twopart`
        }
        const response = await fetch(url);
        const data = await response.json();
        return new Promise((resolve, reject) => {
            this.setState({
                joke: data,
                text: data.setup,
                flipped: false,
                cardColor: PRIMARY_COLOR,
                textColor: SECONDARY_COLOR,
            }, () => resolve());
        });
    }

    // Pops up a Dialog box that Alerts the user that the joke has been saved and saves it to savedJokes in Archive.js
    saveJoke = () => {
        Alert.alert('Saved', '', [
            { text: 'OK', onPress: () => { addJoke(this.state.joke) } },
        ]);
    }

    // Renders the screen
    render() {
        if (!this.state.joke) {
            return (
                <View style={styles.container}>
                    <Pressable style={{ ...styles.jokeCard, backgroundColor: this.state.cardColor }}>
                        <Text style={{ ...styles.text, color: this.state.textColor }}>{LOADING_TEXT}</Text>
                    </Pressable>
                </View >)
        }
        return (
            <View style={styles.container}>
                <Pressable style={{ ...styles.jokeCard, backgroundColor: this.state.cardColor }} onPress={() => this.flip()} onLongPress={() => this.saveJoke()}>
                    <Text style={{ ...styles.text, color: this.state.textColor }}>{this.state.text}</Text>
                </Pressable>
            </View >
        )
    }
}

// Declares stylesheet
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR,
        alignItems: 'center',
        justifyContent: 'center'
    },
    jokeCard: {
        paddingTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        height: 400,
        width: 250
    },
    text: {
        alignSelf: 'center',
        padding: 12,
        fontFamily: 'Montserrat_500Medium',
        fontSize: 18,
    }
})
