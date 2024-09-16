import React, { useState } from 'react';
import { Textarea } from './textarea';
import { Button } from './button';
import { PhotoIcon } from '@heroicons/react/24/outline'

const AddFeedForm: React.FC = () => {
    const [text, setText] = useState('');
    const [image, setImage] = useState<File | null>(null);

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Kirim data ke backend atau update state feed
        console.log({ text, image });

        // Reset form setelah submit
        setText('');
        setImage(null);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <form onSubmit={handleSubmit}>
                {/* Text Input */}
                <div className="flex space-y-4 flex-col">
               
                    <Textarea
                        className="w-full bg-gray-100 rounded-lg"
                        placeholder="What's on your mind?"
                        rows={3}
                        value={text}
                        onChange={handleTextChange}
                    />
                    <div className='flex space-x-2'> 

                        <Button type="submit" >
                            Post
                        </Button>
                        <Button type="submit" variant={'outline'}>
                            <PhotoIcon className="h-6 w-6 cursor-pointer" />
                        </Button>
                    </div>

                </div>

                {/* Image Preview */}
                {image && (
                    <div className="mb-4">
                        <img
                            src={URL.createObjectURL(image)}
                            alt="Selected"
                            className="max-h-40 rounded-lg"
                        />
                    </div>
                )}

                {/* File Input and Submit Button */}
                <div className="flex justify-between items-center">
                    {/* <FileInput onChange={handleImageChange} accept="image/*" className="cursor-pointer" /> */}


                </div>
            </form>
        </div>
    );
};

export default AddFeedForm;