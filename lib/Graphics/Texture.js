class Texture {
    #filename_;
    #format_;
    #filtering_;
    #glTexture_;

    constructor(filename, format = TextureFormat.RGBA, filtering = TextureFiltering.LINEAR) {
        if(!Type.isString(filename)) {
            console.error("Texture constructor filename must be a string!");
            return null;
        }

        if(!Type.isEnum(format, TextureFormat)) {
            console.error("Texture constructor format must be a TextureFormat enum!");
            return null;
        }

        if(!Type.isEnum(filtering, TextureFiltering)) {
            console.error("Texture constructor filtering must be a TextureFiltering enum!");
            return null;
        }

        this.#filename_ = filename;
        this.#format_ = format;
        this.#filtering_ = filtering;

        this.#glTexture_ = Canvas.gl.createTexture();
        
        Canvas.gl.bindTexture(Canvas.gl.TEXTURE_2D, this.glTexture);
        const glFormat = this.format == 0 ? Canvas.gl.RGBA : (this.format == 1 ? Canvas.gl.RGB : Canvas.gl.ALPHA);
        const glType = this.format == 0 ? Canvas.gl.UNSIGNED_BYTE : (this.format == 1 ? Canvas.gl.UNSIGNED_BYTE : Canvas.gl.UNSIGNED_BYTE);
        const element = document.querySelector("img[id='" + this.#filename_ + "']");
        Canvas.gl.texImage2D(Canvas.gl.TEXTURE_2D, 0, glFormat, glFormat, glType, element);

        var glFilter = this.filtering == 0 ? Canvas.gl.LINEAR : Canvas.gl.NEAREST;
        if (Mathf.isPowerOf2(element.width) && Mathf.isPowerOf2(element.height)) {
           Canvas.gl.generateMipmap(Canvas.gl.TEXTURE_2D);
           glFilter = this.filtering == 0 ? Canvas.gl.NEAREST_MIPMAP_LINEAR : Canvas.gl.LINEAR_MIPMAP_NEAREST;
        }
        
        Canvas.gl.texParameteri(Canvas.gl.TEXTURE_2D, Canvas.gl.TEXTURE_WRAP_S, Canvas.gl.CLAMP_TO_EDGE);
        Canvas.gl.texParameteri(Canvas.gl.TEXTURE_2D, Canvas.gl.TEXTURE_WRAP_T, Canvas.gl.CLAMP_TO_EDGE);
        Canvas.gl.texParameteri(Canvas.gl.TEXTURE_2D, Canvas.gl.TEXTURE_MIN_FILTER, glFilter);
    }

    get filename() { return this.#filename_; }
    set filename(value) { console.error("Texture filename is readonly!"); }

    get format() { return this.#format_; }
    set format(value) { console.error("Texture format is readonly!"); }

    get filtering() { return this.#filtering_; }
    set filtering(value) { console.error("Texture filtering is readonly!"); }

    get glTexture() { return this.#glTexture_; }
    set glTexture(value) { console.error("Texture glTexture is readonly!"); }
}

const TextureFormat = Object.freeze({
    RGBA: 0,
    RGB: 1,
    ALPHA: 2
});

const TextureFiltering = Object.freeze({
    LINEAR: 0,
    POINT: 1
});