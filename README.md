# tarnkappe.info
Feingranulare uBlock Origin Filter für tarnkappe.info. Blockt störende Werbeelemente ohne Inhalte zu zerstören, zum Importieren in deine eigene Filterliste.

## Beschreibung

Da die Werbung auf tarnkappe.info inzwischen stark überhandnimmt und viele Inhalte mich nicht interessieren, habe ich nach einer Möglichkeit gesucht, beides auszublenden. Dabei bin ich auf ein interessantes Repo bei GitLab gestoßen, dessen Link ich leider nicht mehr finden kann – nachfolgend die Details, die sicherlich auch andere interessieren. Man kann damit je nach Wunsch einzelne oder alle unerwünschten Elemente ausblenden.

## So geht's

Den Codeblock unten kopieren, im uBlock-Origin-Dashboard (Zahnrad-Symbol → Reiter „Meine Filter") einfügen und speichern – fertig.

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

>[!NOTE]
>Mit den Filterregeln werden übrigens auch Artikel ausgeblendet, die tarnkappe.info als Test kennzeichnet. Diese Regel habe ich separat angelegt wer sie nicht möchte, löscht einfach die entsprechende Zeile oder kommentiert sie mit einem vorangestellten ! aus.
>Das gilt grundsätzlich für jede Regel. Falls nach dem Aktivieren einzelne Seitenteile fehlen, einfach die betroffene Zeile im Filter-Editor löschen (oder mit ! deaktivieren) und auf „Anwenden" klicken. So findet ihr Schritt für Schritt heraus, welche Regel zu aggressiv greift.

Wer die Seite trotzdem mag, kann ja immer noch spenden. Aber wenn man als normaler Nutzer vor lauter Anzeigen nicht mehr lesen kann, ist der Sinn wohl verfehlt.

## uBlock-Regeln

```card
! Title: tarnkappe.info Filter
! Description: Blockiert Werbung und unerwünschte Elemente auf tarnkappe.info
! Homepage: [https://github.com/DEIN-NAME/REPO-NAM]](https://github.com/6768616E6479/tarnkappe.info)
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
