// Array of jokes the user has saved. Displayed in SavedScreen
let savedJokes = [];

// Returns the Array of savedJokes
export const loadJokes = () => {
    return savedJokes;
}

// Checks if joke already exists. If not adds it.
export const addJoke = (newItem) => {
    if (!savedJokes.some(item => item.joke.setup === newItem.setup))
        savedJokes.unshift({ id: savedJokes.length, flipped: false, joke: newItem });
}

// Removes all jokes that have the same setup as the joke inputed. In practice no two jokes have the same setup.
export const removeJoke = (newItem) => {
    savedJokes = savedJokes.filter(item => item.joke.setup !== newItem.joke.setup)
}