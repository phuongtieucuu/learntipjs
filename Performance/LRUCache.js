class LRUCache {
    constructor(size) {
        this.size = size || 3;
        this.cache = new Map()
    }

    put(key, value) {
        const hasKey = this.cache.has(key)
        if (hasKey) {
            this.cache.delete(hasKey)
        }
        this.cache.set(key, value)
        if (this.cache.size > this.size) {
            this.cache.delete(this.cache.keys().next().value)
        }
    }

    get(key) {
        const hasKey = this.cache.has(key)
        if (!hasKey) {
            return -1;
        }
        const val = this.cache.get(key)
        this.cache.delete(key)
        this.cache.set(key, val)
        return val
    }

    items() {
        console.log(this.cache.entries());
    }
}

const cache = new LRUCache(3)

cache.put(1, 1)
cache.put(2, 2)
cache.put(3, 3)
cache.items()
cache.get(1)
cache.items()
cache.get(3)
cache.items()
cache.put(4, 4)
cache.items()
cache.put(5, 5)
cache.items()