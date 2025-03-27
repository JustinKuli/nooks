// Tunings close to Western conventions will use pitches 1-24 (inclusive).
// The 0th pitch is the base note, `1.0`.
// What would be the 24th pitch is _usually_ the octave, `2.0`.
// But different "octave" intervals are allowed, and may be useful for stringed instruments.
// Pitches beyond 24 are allowed, but may be considered unconventional.
// This number of pitches allows for some non-enharmonic pitches (C# can be different from Db),
// _or_ quarter tones (C "half-sharp"), but probably not both at once, and might not allow all
// different "spellings" to be unequal (E# might always be F, but it's kind of ambiguous)
const TwelveTET = {
    convention: "western",
    // 0: 1.0,                // C
    
    1: Math.pow(2, (1/12)),   // C# or half-sharp; we'll write C/#
    2: Math.pow(2, (1/12)),   // C# & Db equal enharmonic
    3: Math.pow(2, (1/12)),   // Db or half-flat; we'll write D/b

    4: Math.pow(2, (2/12)),   // D
    
    5: Math.pow(2, (3/12)),   // D/#
    6: Math.pow(2, (3/12)),   // D# & Eb
    7: Math.pow(2, (3/12)),   // E/b
    
    8: Math.pow(2, (4/12)),   // E
    
    9: Math.pow(2, (9/24)),   // phee (!!), E#/2, Fb/2

    10: Math.pow(2, (5/12)),  // F
    
    11: Math.pow(2, (6/12)),  // F/#
    12: Math.pow(2, (6/12)),  // F# & Gb
    13: Math.pow(2, (6/12)),  // G/b
    
    14: Math.pow(2, (7/12)),  // G
    
    15: Math.pow(2, (8/12)),  // G/#
    16: Math.pow(2, (8/12)),  // G# & Ab
    17: Math.pow(2, (8/12)),  // A/b
    
    18: Math.pow(2, (9/12)),  // A
    
    19: Math.pow(2, (10/12)), // A/#
    20: Math.pow(2, (10/12)), // A# & Bb
    21: Math.pow(2, (10/12)), // B/b
    
    22: Math.pow(2, (11/12)), // B

    23: Math.pow(2, (23/24)), // sbee (!!), B#/2, Cb/2

    24: 2.0,                  // C
}

const TwentyFourTET = {
    convention: "western",
    // 0: 1.0,                // C
    
    1: Math.pow(2, (1/24)),   // C#/2; unambiguous C half-sharp
    2: Math.pow(2, (2/24)),   // C# & Db equal enharmonic
    3: Math.pow(2, (3/24)),   // Db/2; unambiguous D half-flat

    4: Math.pow(2, (4/24)),   // D
    
    5: Math.pow(2, (5/24)),   // D#/2
    6: Math.pow(2, (6/24)),   // D# & Eb
    7: Math.pow(2, (7/24)),   // Eb/2
    
    8: Math.pow(2, (8/24)),   // E
    9: Math.pow(2, (9/24)),   // E#/2 & Fb/2
    10: Math.pow(2, (10/24)),  // F
    
    11: Math.pow(2, (11/24)),  // F#/2
    12: Math.pow(2, (12/24)),  // F# & Gb
    13: Math.pow(2, (13/24)),  // Gb/2
    
    14: Math.pow(2, (14/24)),  // G
    
    15: Math.pow(2, (15/24)),  // G#/2
    16: Math.pow(2, (16/24)),  // G# & Ab
    17: Math.pow(2, (17/24)),  // Ab/2
    
    18: Math.pow(2, (18/24)),  // A
    
    19: Math.pow(2, (19/24)), // A#/2
    20: Math.pow(2, (20/24)), // A# & Bb
    21: Math.pow(2, (21/24)), // Bb/2
    
    22: Math.pow(2, (22/24)), // B
    23: Math.pow(2, (23/24)), // B#/2, Cb/2
    24: 2.0,                  // C
}

// TODO: this is a mess, the wikipedia article uses D-based tuning,
// but to match the other "western" tunings, I want to convert it to C. 
const TwelvePythagorean = {
    convention: "western"
    // 0: 1.0     //           ; C

    1: 256/243,   // C#/2
    2: 256/243,   // 2^8 / 3^5 ; Db
    3: 256/243,   // Db/2
    
    4: 9/8,       // 3^2 / 2^3 ; D  - major second

    5: 32/27,     // D#/2, Eb/2
    6: 32/27,     // 2^5 / 3^3 ; F 
    7: 32/27,     // F#/2, Gb/2 
    
    8: 81/64,     // 3^4 / 2^6
    9: 4/3,       // 2^2 / 3^1 ; perfect fourth
    10: 4/3,      // 2^2 / 3^1 - perfect fourth

    11: 1024/729, // 2^10/ 3^6 ; diminished fifth (!)
    12: 0,        // no unambiguous tritones here (?!)
    13: 729/512,  // 3^6 / 2^9 ; augmented fourth (!)
    14: 3/2,      // 3^1 / 2^1 ; perfect fifth
    16: 128/81,   // 2^7 / 3^4
    18: 27/16,    // 3^3 / 2^4
    20: 16/9,     // 2^4 / 3^2 ; minor seventh
    22: 243/128,  // 3^5 /2^7
}

const Tuning1 = {
    name: "C: 12 Equal Temperament",
    base: 261.6256, // C4 from A440
    pitches: TwelveTET,
    octaveRatio: 2.0,
}

const Tuning2 = {
    name: "D: Pythagorean",
    base: 293.67, // D4 from A440
    pitches: TwelvePythagorean,
    octaveRatio: 2.0,
}

let sampleNote = {

}

// The things below are leftovers from demonstrating the "beats" that
// can be heard when two sounds are almost in tune.

function playTone(frequency, duration = 1) {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)(); 
    const gainNode = audioCtx.createGain();
    const oscillator = audioCtx.createOscillator();

    oscillator.type = "sine";
    oscillator.frequency.value = frequency;

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + duration);
}

playTone(600, 60)

const mouseAudioCtx = new (window.AudioContext || window.webkitAudioContext)(); 
const mouseGainNode = mouseAudioCtx.createGain();
const mouseOscillator = mouseAudioCtx.createOscillator();

mouseOscillator.type = "sine";
mouseOscillator.frequency.value = 600;

mouseOscillator.connect(mouseGainNode);
mouseGainNode.connect(mouseAudioCtx.destination);

mouseOscillator.start();
mouseOscillator.stop(mouseAudioCtx.currentTime + 60);

document.addEventListener("mousemove", (event) => {
    const relDist = (-2 * (event.clientY - (window.innerHeight / 2))) / window.innerHeight
    const val = 600 + relDist * 20

    console.log(`Y: ${val}`);

    mouseOscillator.frequency.value = val
});
