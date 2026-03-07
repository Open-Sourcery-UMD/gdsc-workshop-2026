# 🧙‍♂️ Gideon, The Open Sourcerer of GDSC 🧙‍♂️

<p align="center">
<img src="gideon.png" alt="Gideon, The Open Sourcerer of GDSC" width="200"/>
</p>

Welcome to **Gideon, The Open Sourcerer of GDSC**, the activity for the **GDSC <> Open Sourcery Workshop**!

In this activity, you'll make open-source contributions together by adding new *keyspells* to Gideon, the Open Sourcerer of GDSC.

Each person will be assigned a unique keyboard letter (e.g. `q`, `w`, `e`, …) and will customize a keyspell for it (a spell that casts when that letter key is pressed).

---

<details>
<summary>Table of Contents</summary>

1. [The Goal](#the-goal)  
2. [Getting Started](#getting-started)  
3. [How It Works](#how-it-works)  
4. [Submitting Your Keyspell](#submitting-your-keyspell)

</details>

---

<a id="the-goal"></a>

## 🏆 The Goal

When someone presses your assigned key:

1. A keyspell will appear to be cast from **Gideon** (displayed at the bottom of the screen).
2. The keyspell will fly upward in a random direction at a random speed.
3. The keyspell should have a unique style and effect created by your group!

Through Git commits and pull requests, we’ll combine everyone’s keyspells into this repository.

---

<a id="getting-started"></a>

## 🔮 Getting Started

### 1. Fork this repository

Click the **Fork** button at the top-right of this page to create your own copy of the repository.

You will now have your own version of the project under your GitHub account.

---

### 2. Clone your fork

In your terminal, clone **your fork** (not the original repository):
```bash
git clone https://github.com/YOUR-USERNAME/gdsc-workshop-2026.git
```

Replace `YOUR-USERNAME` with your GitHub username.

---

### 3. Open the folder for editing

Open the `gdsc-workshop-2026` folder in your IDE or text editor of choice (for example, **VS Code**).

---

### 4. Open the project in your browser

Open the `index.html` file in your browser.

You’ll see Gideon on the screen. Pressing your assigned key will cast your keyspell.

---

### 5. Find your spell file

Each keyspell corresponds to a key on the keyboard:

```bash
qSpell.js
wSpell.js
eSpell.js
rSpell.js
...
mSpell.js
```
You will be told which file to edit (for example: `fSpell.js`).

---

### 6. Make your keyspell unique!

Inside your file, you’ll see commented sections like:
```bash
// ADD STYLES HERE
```
and
```bash
// FEEL FREE TO CHANGE THESE
```

These are where your creativity comes in!

You can:

- Change the **color, size, or shape** of the keyspell *(basic)*
- Change the **sound effect** for when your keyspell is cast *(basic)*
- Add **animations, rotations, sparkles, or glow effects** *(medium)*
- Make it **bounce off walls or react to gravity** *(advanced)*
- Make it **explode or multiply** *(advanced)*

Even if you do nothing, no worries; your assigned keyspell will still work as a simple black dot that flies upward with a *whoosh* sound.

---

<a id="how-it-works"></a>

## ⚙️ How It Works

`index.html` loads each keyspell file.

Each `*Spell.js` file listens for its key press and creates a visual element (`div`) that flies away from Gideon.

You only need to modify **your keyspell file** — everything else is already set up.

---

<a id="submitting-your-keyspell"></a>

## 🪄 Submitting Your Keyspell

Once you're happy with your keyspell:

### 1. Commit your changes

Example:
```bash
git add fSpell.js
git commit -m "Customize fSpell: Fireball of Firebase"
```

---

### 2. Push to your fork

```bash
git push origin main
```

---

### 3. Open a Pull Request

1. Go to your fork on GitHub
2. Click **"Compare & pull request"**
3. Create a pull request into the **main repository**

---

### 4. Link your Pull Request to the Issue

In your pull request description, include:

```bash
Closes #_
```

Replace `_` with the number of the issue you were assigned.

Example:
```bash
Closes #12
```

When the pull request is merged, GitHub will automatically close the issue.

---

Once your pull request is merged, your keyspell becomes part of the project! ✨

Happy hacking!

— Open Sourcery

https://opensourcery.umd.edu/
