import { useForm } from 'react-hook-form';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';

import useCreateCabin from './useCreateCabin';
import { useEditCabin } from './useEditCabin';

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
	const { createCabin, isCreating } = useCreateCabin();
	const { editCabin, isEditing } = useEditCabin();

	const { id: editId, ...editValues } = cabinToEdit;

	const isEditSession = Boolean(editId);

	const { register, handleSubmit, reset, getValues, formState } = useForm({
		defaultValues: isEditSession ? editValues : {},
	});
	const { errors } = formState;

	const isWorking = isCreating || isEditing;

	function onSubmit(data) {
		const image = typeof data.image === 'string' ? data.image : data.image[0];

		if (isEditSession)
			editCabin(
				{ newCabinData: { ...data, image }, id: editId },
				{
					onSuccess: (data) => {
						reset(data);
						onCloseModal?.();
					},
				}
			);
		else
			createCabin(
				{ ...data, image: image },
				{
					onSuccess: (data) => {
						reset();
						onCloseModal?.();
					},
				}
			);
	}

	function onError(errors) {
		// console.log(errors);
	}

	return (
		<Form
			onSubmit={handleSubmit(onSubmit, onError)}
			type={onCloseModal ? 'modal' : 'regular'}>
			<FormRow label='Cabin name' error={errors?.name?.message}>
				<Input
					disabled={isWorking}
					type='text'
					id='name'
					{...register('name', { required: 'This field is required' })}
				/>
			</FormRow>

			<FormRow label='Max capacity' error={errors?.maxCapacity?.message}>
				<Input
					disabled={isWorking}
					type='number'
					id='maxCapacity'
					{...register('maxCapacity', {
						required: 'This field is required',
						min: {
							value: 1,
							message: 'Capacity should be at least one 1',
						},
					})}
				/>
			</FormRow>

			<FormRow label='Regular price' error={errors?.regularPrice?.message}>
				<Input
					disabled={isWorking}
					type='number'
					id='regularPrice'
					{...register('regularPrice', {
						required: 'This field is required',
						min: {
							value: 1,
							message: 'Price should be at least one 1',
						},
					})}
				/>
			</FormRow>

			<FormRow label='Discount' error={errors?.discount?.message}>
				<Input
					disabled={isWorking}
					type='number'
					id='discount'
					defaultValue={0}
					{...register('discount', {
						required: 'This field is required',
						validate: (value) =>
							(value >= 0 && value < getValues().regularPrice) ||
							'Discount should be less than regular price',
					})}
				/>
			</FormRow>

			<FormRow
				label='description for cabin'
				error={errors?.description?.message}>
				<Textarea
					type='number'
					id='description'
					defaultValue=''
					{...register('description', { required: 'This field is required' })}
				/>
			</FormRow>

			<FormRow label='Cabin photo' error={errors?.image?.message}>
				<FileInput
					disabled={isWorking}
					id='image'
					accept='image/*'
					{...register('image', {
						required: isEditSession ? false : 'This field is required',
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button
					variation='secondary'
					type='reset'
					onClick={() => onCloseModal?.()}>
					Cancel
				</Button>
				<Button disabled={isWorking}>
					{isEditSession ? 'Edit cabin' : 'Create new cabin'}
				</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
