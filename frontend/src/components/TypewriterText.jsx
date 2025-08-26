import React, { useCallback, useEffect, useState } from 'react'

const TypewriterText = React.memo(() => {
  const texts = [
    "Artificial Intelligence is shaping the future.",
    "Large Language Models learn from vast amounts of data.",
    "Prompt engineering improves AI responses.",
    "ChatGPT and Claude are popular AI assistants."
  ];

  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayText, setDisplayText] = useState('');

  // memoize getrandomtext to prevent unnecessary recreation
  const getRandomText = useCallback(() => {
    if (texts.length <= 1) return 0;

    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * texts.length);
    } while (newIndex === textIndex);

    return newIndex;
  }, [textIndex, texts.length]);

  useEffect(() => {
    const currentText = texts[textIndex];
    const typingSpeed = isDeleting ? 30 : 70;
    const pauseDelay = 2000;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentText.length) {
          setDisplayText(currentText.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), pauseDelay);
        }
      } else {
        if (charIndex > 0) {
          setDisplayText(currentText.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setTextIndex(getRandomText());
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, textIndex, getRandomText, texts]);

  return (
    <div>
      <p className="text-xs text-center text-gray-500 dark:text-gray-400 typewriter-text">
        {displayText} <span className="animate-pulse">|</span>
      </p>

      {/* not display but indexed by search engine */}
      <div className="hidden">
        <h2>AI Facts & Knowledge</h2>
        <p>
          Discover interesting facts about artificial intelligence, language models, and prompt engineering principles.
          Learn about ChatGPT, Claude, and other AI Assistants.
        </p>
        <ul>
          <li>How large language models process information</li>
          <li>Evolution of prompt engineering techniques</li>
          <li>Comparing capabilities of different AI models</li>
          <li>Understanding AI limitations and strengths</li>
          <li>The science behind effective AI interaction</li>
        </ul>
      </div>
    </div>
  );
});

TypewriterText.displayName = 'TypewriterText';

export default TypewriterText;
