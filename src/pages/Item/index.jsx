import {
	Box,
	Button,
	IconButton,
	Image,
	Input,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconPlus, IconSort } from '../../components/Icons';
import { ModalDelete } from '../../components/Modals';

export default function Item() {
	const [activity, setActivity] = React.useState({
		created_at: '2022-08-04T15:18:46.000Z',
		id: 23749456,
		title: 'New Activity 1',
	});
	const [todoSelected, setTodoSelected] = React.useState({
		activity_group_id: 23749456,
		id: 16545,
		is_active: 1,
		priority: 'very-high',
		title: 'testing',
	});
	const [todos, setTodos] = React.useState([]);
	const [changeTitle, setChangeTitle] = React.useState(false);
	const { isOpen, onOpen, onClose } = useDisclosure();
	let navigate = useNavigate();

	const handleDelete = () => {
		console.log(todoSelected);
		onClose();
	};

	return (
		<>
			<Box
				marginTop="43px"
				marginBottom="59px"
				display="flex"
				justifyContent="space-between"
			>
				<Box display="flex" gap="19px" alignItems="center">
					<Image
						src="/static/icons/todo-back-button.svg"
						alt="todo-back-button"
						width="24px"
						cursor="pointer"
						onClick={() => navigate(-1)}
					/>
					{changeTitle ? (
						<Input
							variant="flushed"
							width="md"
							fontSize="36px"
							fontWeight="bold"
							lineHeight="54px"
							focusBorderColor="#111111"
							onBlur={() => setChangeTitle(false)}
						/>
					) : (
						<Text
							data-cy="activity-title"
							textStyle="h1"
							onClick={() => setChangeTitle(true)}
						>
							{activity.title}
						</Text>
					)}
					<Image
						src="/static/icons/todo-title-edit-button.svg"
						alt="todo-title-edit-button"
						width="24px"
						cursor="pointer"
						onClick={() => setChangeTitle(true)}
					/>
				</Box>
				<Box display="flex" gap="18px">
					<IconButton
						colorScheme="grey"
						aria-label="sort"
						icon={<IconSort />}
						w="54px"
						h="54px"
						border={`1px solid #E5E5E5`}
						borderRadius="50%"
					/>
					<Button
						data-cy="activity-add-button"
						minW="150px"
						height="54px"
						bg={'prime.900'}
						color="white"
						borderRadius="45px"
						fontSize="18px"
						fontWeight="semibold"
						px="22px"
						py="13.5px"
						leftIcon={<IconPlus />}
					>
						Tambah
					</Button>
				</Box>
			</Box>
			<Box>
				{todos.length > 0 ? (
					todos.map((data, i) => <Box>OKE</Box>)
				) : (
					<Box
						data-cy="activity-empty-state"
						display="flex"
						justifyContent="center"
					>
						<Image
							src="/static/images/todo-empty-state.png"
							alt="activity-empty-state"
							marginBottom="50px"
						/>
					</Box>
				)}
			</Box>
			<ModalDelete
				isOpen={isOpen}
				onClose={onClose}
				onAction={handleDelete}
				content={`Apakah anda yakin menghapus List Item<br />
				<strong>“${todoSelected?.title}”?</strong>`}
			/>
		</>
	);
}
