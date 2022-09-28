import { LabelAnnotation } from "../types/google";

const GOOGLE_API_KEY = import.meta.env.YEXT_PUBLIC_GOOGLE_API_KEY;

export const callGoogleVisionApi = async (
  imageUrl: string
): Promise<LabelAnnotation[] | null> => {
  try {
    const response = await fetch(
      `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_API_KEY}`,
      {
        method: "POST",
        body: JSON.stringify({
          requests: [
            {
              image: {
                source: {
                  imageUri: imageUrl,
                },
              },
              features: [
                {
                  type: "LABEL_DETECTION",
                  maxResults: 10,
                },
              ],
            },
          ],
        }),
      }
    );
    const json = await response.json();
    return json.responses[0].labelAnnotations as LabelAnnotation[];
  } catch (error) {
    console.log(error);
    return null;
  }
};

// function that uploads an image to cloudinary and returns the url
export const uploadImage = async (file: File): Promise<string | null> => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "yc0x5g46");
    formData.append("cloud_name", "yext");
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/yext/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const json = await response.json();
    return json.secure_url;
  } catch (error) {
    console.log(error);
    return null;
  }
};
