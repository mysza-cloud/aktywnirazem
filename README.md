# Aktywni Razem — wersja pokazowa na GitHub Pages

Gotowa strona statyczna. Nie wymaga budowania ani instalowania pakietów. `index.html` i katalog `assets` muszą zachować obecną strukturę.

## Publikacja przez stronę GitHub

1. Utwórz repozytorium, np. `aktywni-razem`. Dla GitHub Free wybierz repozytorium publiczne.
2. Wgraj **zawartość tego folderu**, a nie nadrzędny folder GitHub-Pages. Plik `index.html` powinien znaleźć się bezpośrednio w głównym katalogu repozytorium. Zachowaj wszystkie pliki JS, CSS, assets oraz pusty `.nojekyll`.
3. Zapisz zmiany na gałęzi `main`.
4. Otwórz Settings → Pages → Build and deployment. Wybierz Deploy from a branch, gałąź main i katalog / (root), następnie Save.
5. Po zakończeniu publikacji adres strony znajdziesz w Settings → Pages → Visit site. Dla zwykłego repozytorium będzie miał postać https://NAZWA-UZYTKOWNIKA.github.io/NAZWA-REPOZYTORIUM/.

Instrukcja GitHub: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site

## Co działa i jakie są ograniczenia

- Interfejs, motywy, formularze demo, pulpit, ulubione, szkice, lokalne powiadomienia i demonstracja społecznościowa działają w przeglądarce.
- Dane, zdjęcie profilowe i wiadomości wprowadzone podczas testów pozostają w localStorage danej przeglądarki. Nie synchronizują się pomiędzy urządzeniami ani użytkownikami. To nie jest prawdziwe logowanie lub ochrona kont.
- Wszystkie startowe wydarzenia i osoby są fikcyjne. Do pokazu nie wpisuj prawdziwych danych osobowych lub prywatnych rozmów.
- Wersja nie zawiera serwera, bazy SQLite, sekretów ani zapisów z przeglądarki autora. Usunięto odczyty /api oraz wejście do Katalogu lokalnego — GitHub Pages nie uruchamia tego backendu.
- Prawdziwe konta, zapisy między użytkownikami, czat, voice, integracja Facebook i moderacja wymagają osobnego wdrożenia.
- Mapa jest ilustracją poglądową, nie potwierdzeniem rzeczywistych lokalizacji.
- Publikacja udostępnia stronę w internecie. Ten pakiet nie został automatycznie opublikowany ani połączony z kontem GitHub.

## Aktualizowanie strony

Wgraj kolejną przygotowaną wersję plików do tego samego repozytorium. Nie kopiuj tutaj katalogów data, server, kopii bazy ani plików z hasłami. Zachowaj względne ścieżki zasobów, aby strona działała także pod adresem repozytorium.

Wydanie: 25 października 2026. Informacje o materiałach graficznych: assets/POCHODZENIE.md.
