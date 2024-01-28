CREATE DATABASE lethalcompany
	CHARACTER SET utf8
	COLLATE utf8_hungarian_ci;

USE lethalcompany;

CREATE TABLE default_commands (
    Command varchar(50),
    Text varchar(255)
);

INSERT INTO default_commands (Command, Text)
VALUES 
('main',
'Welcome to the FORTUNE-9 OS
	Courtesy of the Compnay

Happy Sunday.

Type "Help" for a list of commands.'),

('help',
'>MAIN
Gets you to the main sreen.

>WEATHER
Tells the current weather outside.

>BORED
Tells you what to do if you are bored.

>JOKE
Tells you a single line joke.

>RANDOM
Generates a random number between 1 and 10.'),
('loaf',
'
 |\__/,|   (`\
 |_ _  |.--.) )
 ( T   )     /
(((^_(((/(((_/
'),
('doggo',
'
░░░░░░░░░░░░░░░░░░░░
░▄▀▄▀▀▀▀▄▀▄░░░░░░░░░
░█░░░░░░░░▀▄░░░░░░▄░
█░░▀░░▀░░░░░▀▄▄░░█░█
█░▄░█▀░▄░░░░░░░▀▀░░█
█░░▀▀▀▀░░░░░░░░░░░░█
█░░░░░░░░░░░░░░░░░░█
█░░░░░░░░░░░░░░░░░░█
░█░░▄▄░░▄▄▄▄░░▄▄░░█░
░█░▄▀█░▄▀░░█░▄▀█░▄▀░
░░▀░░░▀░░░░░▀░░░▀░░░
'),
('How are you', 'Conputer'),
('random',''),
('weather',''),
('bored',''),
('joke', '');