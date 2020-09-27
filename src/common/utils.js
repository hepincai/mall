export function debounce(func, delay = 100) {
    let timer = null;
    return function(...args) {
        // let obj = args[0];
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            // if (obj) func.apply(obj, args);
            func(args);
        }, delay);
    };
}