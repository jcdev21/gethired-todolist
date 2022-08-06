import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Select,
	Text,
} from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { priorityList } from '../../../constants/priority';

export function ModalForm({ isOpen, onClose, onAction, data, type }) {
	const {
		handleSubmit,
		register,
		reset,
		setValue,
		formState: { dirtyFields },
	} = useForm({
		defaultValues: {
			title: '',
			priority: '',
		},
	});

	function onSubmit(values) {
		onAction({ ...values });
		reset();
	}

	React.useEffect(() => {
		if (data.id) {
			setValue('title', data.title);
			setValue('priority', data.priority);
		} else {
			reset();
		}
	}, [data]);

	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered>
			<ModalOverlay />
			<ModalContent
				data-cy="modal-add"
				minW="830px"
				minH="403px"
				borderRadius="12px"
			>
				<form onSubmit={handleSubmit(onSubmit)}>
					<ModalHeader
						data-cy="modal-add-title"
						textStyle="h3"
						borderBottom={`1px solid #E5E5E5`}
						p={`30px 24px 19px`}
					>
						{type === 'edit' ? 'Edit Item' : 'Tambah List Item'}
					</ModalHeader>
					<ModalCloseButton
						data-cy="modal-add-close-button"
						top="25px"
						right="25px"
					/>

					<ModalBody p={`38px 30px 23px`}>
						<FormControl mb={26}>
							<FormLabel
								data-cy="modal-add-name-title"
								htmlFor="title"
								fontSize={'12px'}
								fontWeight={'semibold'}
							>
								NAMA LIST ITEM
							</FormLabel>
							<Input
								data-cy="modal-add-name-input"
								id="title"
								placeholder="Tambahkan nama list item"
								{...register('title', {
									required: true,
								})}
								height="52px"
								p={`14px 18px`}
								fontSize={'16px'}
								border={`1px solid #E5E5E5`}
								focusBorderColor="prime.900"
								borderRadius={'6px'}
							/>
						</FormControl>
						<FormControl width={'205px'}>
							<FormLabel
								data-cy="modal-add-priority-title"
								htmlFor="priority"
								fontSize={'12px'}
								fontWeight={'semibold'}
							>
								PRIORITY
							</FormLabel>
							{/* <Input
								id="priority"
								list="list-priority"
								placeholder="Pilih Priority"
								height="52px"
								p={`14px 18px`}
								fontSize={'16px'}
							/>
							<datalist id="list-priority">
								<option>OKE asdasd asdasd asdasdas</option>
								<option>OKE2</option>
								<option>OKE3</option>
							</datalist> */}

							<Select
								data-cy="modal-add-priority-dropdown"
								{...register('priority', {
									required: false,
								})}
								id="priority"
								placeholder="Pilih Priority"
								height="52px"
								fontSize={'16px'}
								border={`1px solid #E5E5E5`}
								focusBorderColor="prime.900"
								borderRadius={'6px'}
							>
								{priorityList.map((priority) => (
									<option
										data-cy={priority.dataCy}
										key={priority.key}
										value={priority.key}
									>
										{priority.label}
									</option>
								))}
							</Select>
						</FormControl>
					</ModalBody>

					<ModalFooter
						borderTop={`1px solid #E5E5E5`}
						p={`15px 24px 19px`}
					>
						<Button
							data-cy="modal-add-save-button"
							minW="150px"
							height="54px"
							bg={'prime.900'}
							color="white"
							borderRadius="45px"
							fontSize="18px"
							fontWeight="semibold"
							px="22px"
							py="13.5px"
							disabled={
								type === 'add' &&
								(!dirtyFields.title || !dirtyFields.priority)
							}
							type="submit"
						>
							Simpan
						</Button>
					</ModalFooter>
				</form>
			</ModalContent>
		</Modal>
	);
}
