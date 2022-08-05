import {
	Box,
	Button,
	IconButton,
	Image,
	Input,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDetail, update as updateActivity } from '../../api/activity';
import { store, update } from '../../api/todo';
import { IconPlus, IconSort } from '../../components/Icons';
import { ModalDelete, ModalForm } from '../../components/Modals';
import TodoItem from '../../components/TodoItem';
import { sortList as initialSortList } from '../../constants/sort';

export default function Item() {
	let params = useParams();
	let { id } = params;
	const [activity, setActivity] = React.useState({});
	const [todoSelected, setTodoSelected] = React.useState({});
	const [todos, setTodos] = React.useState([]);
	const [changeTitle, setChangeTitle] = React.useState(false);
	const [sortList, setSortList] = React.useState(initialSortList);
	const {
		isOpen: isOpenModalDelete,
		onOpen: onOpenModalDelete,
		onClose: onCloseModalDelete,
	} = useDisclosure();
	const {
		isOpen: isOpenModalForm,
		onOpen: onOpenModalForm,
		onClose: onCloseModalForm,
	} = useDisclosure();
	let navigate = useNavigate();

	const handleChangeTitle = (e) => {
		setActivity((activity) => ({ ...activity, title: e.target.value }));
	};

	const handleUpdateActivity = async () => {
		try {
			await updateActivity(id, activity.title);
			setChangeTitle(false);
		} catch (error) {
			console.log(error);
		}
	};

	const handleClickDelete = (data) => {
		setTodoSelected(data);
		onOpenModalDelete();
	};

	const handleDelete = () => {
		console.log(todoSelected);
		onCloseModalDelete();
	};

	const handleSort = (sortTitle) => {
		const tempTodo = todos;
		let result = [];

		if (sortTitle === 'Terbaru') {
			result = tempTodo.sort((a, b) => b.id - a.id);
		} else if (sortTitle === 'Terlama') {
			result = tempTodo.sort((a, b) => a.id - b.id);
		} else if (sortTitle === 'A-Z') {
			result = tempTodo.sort((a, b) => {
				if (a.title < b.title) return -1;
				if (a.title > b.title) return 1;
				return 0;
			});
		} else if (sortTitle === 'Z-A') {
			result = tempTodo.sort((a, b) => {
				if (a.title < b.title) return 1;
				if (a.title > b.title) return -1;
				return 0;
			});
		} else if (sortTitle === 'Belum Selesai') {
			result = tempTodo.sort((a, b) => a.is_active - b.is_active);
		}

		const newSortList = sortList.map((sort, i) => {
			if (sortTitle === sort.title) {
				return {
					...sort,
					isChecked: true,
				};
			} else {
				return {
					...sort,
					isChecked: false,
				};
			}
		});

		setTodos([...result]);
		setSortList(newSortList);
	};

	const handleCheck = async (idTodo) => {
		const idx = todos.findIndex((todo) => todo.id === idTodo);
		const tempTodo = todos;
		tempTodo[idx].is_active = !tempTodo[idx].is_active;
		setTodos([...tempTodo]);

		try {
			await update(tempTodo[idx].id, {
				is_active: tempTodo[idx].is_active,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleModalForm = (data) => {
		setTodoSelected(data);
		onOpenModalForm();
	};

	const handleActionModalForm = async (dataForm) => {
		// console.log(todoSelected);
		onCloseModalForm();
		try {
			if (todoSelected.id) await update(todoSelected.id, dataForm);
			else
				await store({
					...dataForm,
					activity_group_id: id,
				});
			await getDetailActivity();
		} catch (error) {
			console.log(error);
		}
	};

	const getDetailActivity = React.useCallback(async () => {
		try {
			const { data } = await getDetail(id);
			const { todo_items, ...activity } = data;
			setActivity({ ...activity });
			setTodos([...todo_items]);
		} catch (error) {
			console.log(error);
		}
	}, [id]);

	React.useEffect(() => {
		getDetailActivity();
	}, [getDetailActivity]);

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
							autoFocus
							variant="flushed"
							width="md"
							fontSize="36px"
							fontWeight="bold"
							lineHeight="54px"
							focusBorderColor="#111111"
							value={activity.title}
							onChange={(e) => handleChangeTitle(e)}
							onBlur={handleUpdateActivity}
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
					<Menu>
						<MenuButton
							as={IconButton}
							icon={<IconSort />}
							colorScheme="grey"
							aria-label="sort"
							w="54px"
							h="54px"
							border={`1px solid #E5E5E5`}
							borderRadius="50%"
						/>
						<MenuList width="235px">
							{sortList.map((sort) => (
								<MenuItem
									key={sort.title}
									display="flex"
									justifyContent="space-between"
									alignItems="center"
									px="21px"
									py="17px"
									onClick={() => handleSort(sort.title)}
								>
									<Box display="flex" alignItems="center">
										<Image
											src={sort.icon}
											mr="15px"
											width="18px"
											height="18px"
										/>
										<Text>{sort.title}</Text>
									</Box>
									{sort.isChecked && (
										<Image src="/static/icons/checked.svg" />
									)}
								</MenuItem>
							))}
						</MenuList>
					</Menu>
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
						onClick={() => handleModalForm({})}
					>
						Tambah
					</Button>
				</Box>
			</Box>
			<Box marginBottom="50px">
				{todos.length > 0 ? (
					todos.map((data, i) => (
						<TodoItem
							key={data.id}
							handleCheck={handleCheck}
							{...data}
							handleDelete={handleClickDelete}
							handleEdit={() => handleModalForm(data)}
						/>
					))
				) : (
					<Box
						data-cy="activity-empty-state"
						display="flex"
						justifyContent="center"
					>
						<Image
							src="/static/images/todo-empty-state.png"
							alt="activity-empty-state"
							onClick={() => handleModalForm({})}
						/>
					</Box>
				)}
			</Box>
			<ModalDelete
				isOpen={isOpenModalDelete}
				onClose={onCloseModalDelete}
				onAction={handleDelete}
				content={`Apakah anda yakin menghapus List Item<br />
				<strong>“${todoSelected?.title}”?</strong>`}
			/>
			<ModalForm
				isOpen={isOpenModalForm}
				onClose={onCloseModalForm}
				onAction={handleActionModalForm}
				data={todoSelected}
				type={Object.keys(todoSelected).length ? 'edit' : 'add'}
			/>
		</>
	);
}
