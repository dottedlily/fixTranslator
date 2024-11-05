let favorites = [];
const translateButton = document.getElementById('translateButton');
const saveButton = document.getElementById('saveButton');
import { fakeTranslate } from './fakeTranslate.js';


// Функция для перевода слова с использованием fakeTranslate
async function translateWord() {
    const word = document.getElementById("wordInput").value.trim();
    
    if (!word) {
        alert("Введите слово для перевода.");
        saveButton.disabled = true;
        document.getElementById("translationResult").innerText = '';
        return;
    }
    try {
        const translation = await fakeTranslate(word);
        document.getElementById("translationResult").innerText = translation;
        // Разблокировать кнопку сохранения
        saveButton.disabled = false;

    } catch (error) {
        // Покажите сообщение об ошибке
        alert("Такого слова нет в словаре");
        console.error('ОШИБКА');
        document.getElementById("translationResult").innerText = '';
        saveButton.disabled = true;
    }
}

// Сохранение перевода в избранное
function saveTranslation() {
    const word = document.getElementById("wordInput").value.trim();
    const translation = document.getElementById("translationResult").innerText;

    favorites.push({ word, translation });
    updateFavorites();
    document.getElementById("saveButton").disabled = true;

    alert(`Сохранено: ${word} - ${translation}`);
}

// Обновление списка избранного
function updateFavorites() {
    const favoritesList = document.getElementById("favoritesList");
    favoritesList.innerHTML = ""; // Очистить список

    if (favorites.length === 0) {
        const message = document.createElement("li");
        message.innerText = "Нет избранных переводов.";
        favoritesList.appendChild(message);
    } else {
        favorites.forEach((item, index) => {
            const listItem = document.createElement("li");
            listItem.innerText = `${item.word} - ${item.translation}`;
            
            const removeButton = document.createElement("button");
            removeButton.innerText = "Удалить";
            removeButton.addEventListener("click", () => removeFavorite(index));
            
            listItem.appendChild(removeButton);
            favoritesList.appendChild(listItem);
        });
    }
}

// Удаление перевода из избранного
function removeFavorite(index) {
    // Удалите элемент из favorites
    favorites.splice(index, 1);
    updateFavorites();
    alert("Перевод удален из избранного.");
}

// Добавьте обработчики событий для кнопок

translateButton.addEventListener('click', translateWord);
saveButton.addEventListener('click', saveTranslation);