import {
  v2 as cloudinary,
  type UploadApiResponse,
} from 'cloudinary';

const CLOUDINARY_CLOUD_NAME = import.meta.env.CLOUDINARY_CLOUD_NAME ?? '';
const CLOUDINARY_API_KEY = import.meta.env.CLOUDINARY_API_KEY ?? '';
const CLOUDINARY_API_SECRET = import.meta.env.CLOUDINARY_API_SECRET ?? '';

cloudinary.config({ 
  cloud_name: CLOUDINARY_CLOUD_NAME, 
  api_key:    CLOUDINARY_API_KEY, 
  api_secret: CLOUDINARY_API_SECRET,
});

class ImageUpload {

  static async load(file: File): Promise<UploadApiResponse> {

    const { base64Image, imageType } = await ImageUpload.transformFile(file);

    const uploadResult = await cloudinary.uploader.upload(
      `data:image/${imageType};base64,${base64Image}`, {
      folder: 'astro/products',
    });

    return uploadResult;

  }

  static async delete(publicId: string): Promise<boolean> {
    try {
      await cloudinary.uploader.destroy(publicId);
      return true;
    } catch (error) {
      console.log(error as UploadApiResponse);
      return false;
    }
  }

  private static async transformFile(file: File) {

    const buffer = await file.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString('base64');
    const imageType = file.type.split('/').at(1); // image/jpg -> [ "image", "jpg" ] -> "jpg"

    return {
      base64Image,
      imageType,
    };

  }

}

export default ImageUpload;
