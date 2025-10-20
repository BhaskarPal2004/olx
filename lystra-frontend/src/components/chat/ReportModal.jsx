import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
    reportType: yup.string().required('Please select a report type'),
    details: yup.string().required('Message is required').min(5, 'Message must be at least 5 characters long')
});


const ReportModal = ({ isOpen, onClose, onSubmit }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const onFormSubmit = (data) => {
        onSubmit(data);
        reset(); 
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Report</h2>

                <form onSubmit={handleSubmit(onFormSubmit)}>

                    <div className="mb-4">
                        <label className="flex items-center mb-2">
                            <input
                                type="radio"
                                value="isFake"
                                {...register('reportType')}
                                className="mr-2"
                            />
                            Is Fake
                        </label>

                        <label className="flex items-center">
                            <input
                                type="radio"
                                value="isFraud"
                                {...register('reportType')}
                                className="mr-2"
                            />
                            Is Fraud
                        </label>

                        <p className="text-red-600 text-xs font-semibold h-5 2xl:h-3 pt-1 ps-1">
                            {errors.reportType?.message}
                        </p>
                    </div>

                    <div className="mb-4">
                        <textarea
                            className={`w-full border rounded-md p-2 mb-4 resize-none ${errors.details ? 'border-red-500' : ''}`}
                            rows="4"
                            placeholder="Message"
                            {...register('details')}
                        />
                        <p className="text-red-600 text-xs font-semibold h-5 2xl:h-3 pt-1 ps-1">
                            {errors.details?.message}
                        </p>
                    </div>

                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Submit
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default ReportModal;