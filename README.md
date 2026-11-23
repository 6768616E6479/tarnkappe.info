# tarnkappe.info
Feingranulare uBlock Origin und Tampermonkey Filter für tarnkappe.info. Blockt störende Werbeelemente ohne Inhalte zu zerstören, zum Importieren in deine eigene Filterliste.

## 1. Beschreibung

Da die Werbung auf [tarnkappe.info](https://tarnkappe.info) inzwischen stark überhandnimmt und viele Inhalte mich nicht interessieren, habe ich nach einer Möglichkeit gesucht, beides auszublenden. Dabei bin ich auf ein interessantes Repo bei GitLab gestoßen, dessen Link ich leider nicht mehr finden kann. Die dortigen Filterregeln dienten mir als Grundlage, ich habe sie erweitert und an meine Bedürfnisse angepasst. Da das Ergebnis sicherlich auch andere interessiert, stelle ich es hier bereit.

## 2. Voraussetzung

Diese Liste wurde mit **uBlock Origin** (Firefox/Chromium, Manifest V2) erstellt und getestet. Alle verwendeten Regeln, einschließlich der `+js`-Scriptlet-Filter, setzen die vollständige Filter-Engine von uBlock Origin voraus.

Ob die Regeln auch in **uBlock Origin Lite** (z. B. Google Chrome) funktionieren, wurde hier nicht getestet. Als Beispiel, dass die Werbeblocker-Warnung auf tarnkappe.info auch in der Lite-Variante bereits abgedeckt ist, sei auf den offiziellen Fix in [uAssets Issue #35036](https://github.com/uBlockOrigin/uAssets/issues/35036) verwiesen. 

Grundsätzlich gilt: Lite unterstützt zwar mittlerweile eigene Filterlisten, ist aber durch Manifest V3 eingeschränkter, insbesondere bei Scriptlet-Regeln, sodass einzelne Regeln dieser Liste dort möglicherweise nicht oder nur eingeschränkt greifen.

## 3. Alternativen

Basierend auf dem [Newsletter-Blocker](https://github.com/eltoro0815/tarnkappe-newsletter-blocker.user.js/blob/main/tarnkappe-newsletter-blocker.user.js) lassen sich Teile der Filter als Tampermonkey-Userscript umsetzen. Dieses ersetzt uBlock Origin aber nicht vollständig: Netzwerk-Anfragen (z. B. Ads von externen Servern) kann ein Userscript nicht blockieren, sondern nur DOM-Elemente ausblenden und Seiten-Scripts manipulieren.

Zusätzlich besteht der kleinere Wartungsaufwand: Ändert tarnkappe.info seine Struktur, müssen beide Varianten (Filterliste und Userscript) manuell angepasst werden, während die offiziellen uAssets-Listenzentral gepflegt werden.

## 4. uBlock Origin

### 4.1 So geht's

Den Codeblock unten kopieren, im [uBlock-Origin](https://ublockorigin.com/)-Dashboard (Zahnrad-Symbol → Reiter „Meine Filter") einfügen und speichern.

### 4.2 uBlock-Regeln

```card
! Title: tarnkappe.info Filter
! Description: Blockiert Werbung und unerwünschte Elemente auf tarnkappe.info
! Homepage: https://github.com/6768616E6479/tarnkappe.info
! Expires: 7 days
! Licence: MIT

! tarnkappe.info ohne Werbung und bezahlte Artikel
tarnkappe.info##.around-aiCheXu1.around-desktop-ad
tarnkappe.info##.hide-tablet.navbar-item > .buttons
tarnkappe.info###author > .card-content > .content > .buttons
tarnkappe.info##.sidebar-sticky.column
tarnkappe.info##.columns.is-multiline > .column:has(> article.category-werbung)
tarnkappe.info##.columns.is-multiline > .column:has(> .card.banner-post)
tarnkappe.info##.column.is-full:has(.tarnads_general)
! tarnkappe.info##.columns.is-multiline > .column:has(.card-content a:has-text(im test))
tarnkappe.info##div[id^="google_vignette"]
tarnkappe.info##+js(aopr, googletag)
web.archive.org##div:has-text(Kein Bock auf Werbung)
```

>[!NOTE]
>Mit den Filterregeln werden übrigens auch Artikel ausgeblendet, die tarnkappe.info als Test kennzeichnet. Diese Regel habe ich separat angelegt, wer sie nicht möchte, löscht einfach die entsprechende Zeile oder kommentiert sie mit einem vorangestellten ! aus.
>Das gilt grundsätzlich für jede Regel. Falls nach dem Aktivieren einzelne Seitenteile fehlen, einfach die betroffene Zeile im Filter-Editor löschen (oder mit ! deaktivieren) und auf „Anwenden" klicken. So findet ihr Schritt für Schritt heraus, welche Regel zu aggressiv greift.

### 4.3 Die Regeln im Detail

| Filterregel                                                              | Funktion                                                                                                        |
| ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| `.around-aiCheXu1.around-desktop-ad`                                     | Blendet klassische Desktop-Werbebanner (Ad-Inserter-Container) aus.                                             |
| `.hide-tablet.navbar-item > .buttons`                                    | Entfernt Buttons (z. B. Spenden-/Shop-Buttons) aus der oberen Navigationsleiste.                                |
| `#author > .card-content > .content > .buttons`                          | Entfernt Buttons in der Autoren-Box unterhalb von Artikeln.                                                     |
| `.sidebar-sticky.column`                                                 | Blendet die komplette rechte Seitenleiste (Sidebar) aus.                                                        |
| `.columns.is-multiline > .column:has(> article.category-werbung)`        | Entfernt als Artikel getarnte Werbebeiträge (z. B. mit „(Werbung)" oder „Anzeige:" im Titel) aus der Übersicht. |
| `.columns.is-multiline > .column:has(> .card.banner-post)`               | Entfernt interne Werbekacheln zwischen den Artikeln (Forum, Online-Shop, Signal-Gruppe, VPN-Deals).             |
| `.column.is-full:has(.tarnads_general)`                                  | Blendet breitflächige Werbe-Container (tarnads_general) aus.                                                    |
| `.columns.is-multiline > .column:has(.card-content a:has-text(im test))` | **Optionale Regel:** Blendet Artikel aus, deren Überschrift „Im Test" enthält                                   |
| `div[id^="google_vignette"]`                                             | Verhindert bildschirmfüllende Google-Vignette-Einblendungen beim Seitenwechsel.                                 |
| `+js(aopr, googletag)`                                                   | Blockiert das Laden des Google-Ad-Manager-Skripts (googletag) auf JavaScript-Ebene.                             |
| `div:has-text(Kein Bock auf Werbung)`                                    | Blendet den Adblock-Hinweis auf Archivseiten (web.archive.org) aus.                                             |

## 5. Tampermonkey

### 5.1 Tampermonkey installieren

Die Erweiterung [Tampermonkey](https://www.tampermonkey.net/) im Browser installieren (verfügbar für Chrome, Edge, Firefox und Safari).

### 5.2 Script anlegen

* Tampermonkey-Symbol in der Browser-Leiste anklicken
* Entweder:
    * **Neues Userscript erstellen** wählen
    * Den kompletten Inhalt von [`tarnkappe.user.js`](https://github.com/6768616E6479/tarnkappe.info/blob/main/tarnkappe.user.js)
      einfügen (die vorhandene Vorlage dabei vollständig überschreiben)
* Oder:
    * Das Userskript
      [`tarnkappe.user.js`](link-zu-deiner/datei.user.js) herunterladen und
      im Tampermonkey-Dashboard über das **`+`-Register** bzw. **Dienstprogramme →
      Import** hinzufügen
* Speichern mit **Strg + S** (macOS: **Cmd + S**)

## 6. Und sonst?

Wer die Seite trotzdem mag, kann ja immer noch spenden. Aber wenn man als normaler Nutzer vor lauter Anzeigen nicht mehr lesen kann, ist der Sinn wohl verfehlt.
