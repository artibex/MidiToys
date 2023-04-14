export class AnimationCollection {

    static AnimateFromTop(element, endPos: number) {
        const startPosition = -element.offsetHeight;
        const endPosition = endPos;
      
        element.style.top = startPosition + 'px';
        element.style.opacity = 0;
        element.style.display = 'block';
      
        const animationInterval = setInterval(() => {
          if (element.offsetTop >= endPosition) {
            clearInterval(animationInterval);
            element.style.top = endPosition + 'px';
            element.style.opacity = 1;
            return;
          }
      
          const currentPosition = element.offsetTop + 5;
          const currentOpacity = parseFloat(element.style.opacity) + 0.1;
      
          element.style.top = currentPosition + 'px';
          element.style.opacity = currentOpacity;
        }, 10);
      }
      
}