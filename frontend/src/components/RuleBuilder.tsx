import { useForm, SubmitHandler,  } from 'react-hook-form';

interface RuleFormData {
  name: string;
  description: string;
  ruleString: string;
}

interface RuleBuilderProps {
  onSubmit: (data: RuleFormData) => void;
}

export const RuleBuilder = ({ onSubmit }: RuleBuilderProps) => {
  const { register, handleSubmit, formState: { errors },reset } = useForm<RuleFormData>({});

  const onSubmitHandler: SubmitHandler<RuleFormData> = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Create Rule</h2>
     
      <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-6">
        <div>
          <label className="block mb-2">Rule Name</label>
          <input
            {...register('name', { required: true })}
            className="w-full p-2 border rounded"
            placeholder="Enter rule name"
          />
          {errors.name && <span className="text-red-500">Name is required</span>}
        </div>
        <div>
          <label className="block mb-2">Description</label>
          <textarea
            {...register('description')}
            className="w-full p-2 border rounded"
            placeholder="Enter rule description"
          />
        </div>
        <div>
          <label className="block mb-2">Rule String</label>
          <textarea
            {...register('ruleString', { required: true })}
            className="w-full p-2 border rounded"
            placeholder="Enter rule string manually"
          />
          {errors.ruleString && <span className="text-red-500">Rule string is required</span>}
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create Rule
        </button>
      </form>
    </div>
  );
};