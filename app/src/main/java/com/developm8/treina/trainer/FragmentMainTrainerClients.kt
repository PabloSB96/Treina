package com.developm8.treina.trainer

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.developm8.treina.R
import com.developm8.treina.model.Client

class FragmentMainTrainerClients : Fragment() {

    lateinit var recyclerView: RecyclerView
    lateinit var viewAdapter: RecyclerView.Adapter<*>
    lateinit var viewManager: RecyclerView.LayoutManager

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_main_trainer_clients, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        viewManager = LinearLayoutManager(view.context)
        viewAdapter = MainTrainerClientsAdapter(getData(), layoutInflater)
        recyclerView = view.findViewById<RecyclerView>(R.id.recyclerViewTrainerClients).apply {
            setHasFixedSize(true)
            layoutManager = viewManager
            adapter = viewAdapter
        }
    }

    fun getData(): List<Client> {
        val result:ArrayList<Client> = ArrayList()
        result.add(Client(1, "Pablo Sánchez Bello", "https://scontent-mad1-1.cdninstagram.com/v/t51.2885-15/e35/66784963_1423074414498538_916453417422136968_n.jpg?_nc_ht=scontent-mad1-1.cdninstagram.com&_nc_cat=110&_nc_ohc=-v8NZ3J5lJkAX-7_pFW&tp=1&oh=48e31a8774822761eed3ba3fe905bb46&oe=5FF133A7"))
        result.add(Client(2, "O loco do terceiro", "https://ichef.bbci.co.uk/news/640/cpsprodpb/150EA/production/_107005268_gettyimages-611696954.jpg"))
        result.add(Client(3, "Son Goku 'Kakaroto' ", "https://i.pinimg.com/originals/04/32/37/043237fa1ef2024cf0019523caf9e2eb.png"))
        result.add(Client(4, "Vegeta Príncipe Sayayin", "https://tt.tennis-warehouse.com/data/avatars/o/750/750837.jpg?1559007873"))
        return result
    }
}